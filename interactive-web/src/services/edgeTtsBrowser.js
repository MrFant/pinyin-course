/**
 * Browser-compatible Edge TTS client
 *
 * Connects to Microsoft Edge's online TTS service via WebSocket
 * to generate Chinese pinyin audio. Uses native browser WebSocket
 * and Web Crypto API - no Node.js dependencies.
 *
 * Based on the edge-tts protocol from https://github.com/rany2/edge-tts
 */

const TRUSTED_CLIENT_TOKEN = '6A5AA1D4EAFF4E9FB37E23D68491D6F4'
const CHROMIUM_VERSION = '143.0.3650.75'
const SEC_MS_GEC_VERSION = `1-${CHROMIUM_VERSION}`
const WSS_BASE = 'speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1'
const VOICE_LIST_URL = `https://${WSS_BASE.split('/consumer')[0]}/voices/list?trustedclienttoken=${TRUSTED_CLIENT_TOKEN}`

// Windows epoch offset (seconds between 1970-01-01 and 1601-01-01)
const WINDOWS_EPOCH_OFFSET = 11644473600
const TICKS_PER_SECOND = 10_000_000
const FIVE_MINUTES = 300

// Chinese voices available in Edge TTS
const ZH_VOICES = {
  female: 'zh-CN-XiaoxiaoNeural',
  male: 'zh-CN-YunxiNeural',
  default: 'zh-CN-XiaoxiaoNeural',
}

/**
 * Generate Sec-MS-GEC token using Web Crypto API
 * Token = SHA256(ticks_100ns + TRUSTED_CLIENT_TOKEN).toUpperCase()
 */
async function generateSecMsGec() {
  const now = Math.floor(Date.now() / 1000)
  const windowsTime = now + WINDOWS_EPOCH_OFFSET
  const ticks = Math.floor(windowsTime / FIVE_MINUTES) * FIVE_MINUTES
  const ticks100ns = BigInt(ticks) * BigInt(TICKS_PER_SECOND)
  const input = `${ticks100ns.toString()}${TRUSTED_CLIENT_TOKEN}`

  const encoder = new TextEncoder()
  const data = encoder.encode(input)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = new Uint8Array(hashBuffer)
  return Array.from(hashArray)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()
}

/**
 * Generate a UUID v4
 */
function generateUUID() {
  return crypto.randomUUID()
}

/**
 * Build the SSML payload for pinyin text
 */
function buildSSML(text, voice = ZH_VOICES.default, pitch = '+0Hz', rate = '+0%', volume = '+0%') {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

  return (
    `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-US'>` +
    `<voice name='${voice}'>` +
    `<prosody pitch='${pitch}' rate='${rate}' volume='${volume}'>` +
    `${escaped}` +
    `</prosody>` +
    `</voice>` +
    `</speak>`
  )
}

/**
 * Build the speech config message
 */
function buildConfigMessage() {
  const date = new Date().toISOString()
  return `X-Timestamp:${date}\r\nContent-Type:application/json; charset=utf-8\r\nPath:speech.config\r\n\r\n{"context":{"synthesis":{"audio":{"metadataoptions":{"sentenceBoundaryEnabled":"false","wordBoundaryEnabled":"false"},"outputFormat":"audio-24khz-48kbitrate-mono-mp3"}}}}`
}

/**
 * Build the SSML request message
 */
function buildSSMLMessage(ssml, requestId) {
  const timestamp = new Date().toISOString().replace('Z', 'Z')
  return `X-RequestId:${requestId}\r\nContent-Type:application/ssml+xml\r\nX-Timestamp:${timestamp}\r\nPath:ssml\r\n\r\n${ssml}`
}

/**
 * Parse a binary WebSocket message from Edge TTS
 * Returns { type: 'audio'|'metadata', data: Uint8Array|null, path: string|null }
 */
function parseBinaryMessage(buffer) {
  const view = new DataView(buffer)
  // First 2 bytes: header length (big-endian)
  const headerLen = view.getUint16(0)
  // Skip 2 bytes for header length, then read headers
  const headerBytes = new Uint8Array(buffer, 2, headerLen)
  const headerStr = new TextDecoder().decode(headerBytes)

  // Parse path from headers
  const pathMatch = headerStr.match(/Path:(\S+)/)
  const path = pathMatch ? pathMatch[1] : null

  // Audio data starts after 2 (header length) + headerLen
  const audioStart = 2 + headerLen
  const audioData = new Uint8Array(buffer, audioStart)

  return { path, data: audioData }
}

/**
 * Synthesize speech using Edge TTS WebSocket
 * Returns an ArrayBuffer of MP3 audio data
 */
export async function synthesize(text, options = {}) {
  const {
    voice = ZH_VOICES.default,
    pitch = '+0Hz',
    rate = '+0%',
    volume = '+0%',
    timeout = 10000,
  } = options

  const secMsGec = await generateSecMsGec()
  const connectionId = generateUUID()
  const requestId = generateUUID()

  const url =
    `wss://${WSS_BASE}` +
    `?TrustedClientToken=${TRUSTED_CLIENT_TOKEN}` +
    `&ConnectionId=${connectionId}` +
    `&Sec-MS-GEC=${secMsGec}` +
    `&Sec-MS-GEC-Version=${SEC_MS_GEC_VERSION}`

  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url)
    const audioChunks = []
    let resolved = false
    let timeoutId = null

    const cleanup = () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
        ws.close()
      }
    }

    const finish = (result) => {
      if (resolved) return
      resolved = true
      cleanup()
      resolve(result)
    }

    const fail = (err) => {
      if (resolved) return
      resolved = true
      cleanup()
      reject(err)
    }

    timeoutId = setTimeout(() => {
      fail(new Error('Edge TTS WebSocket timeout'))
    }, timeout)

    ws.onopen = () => {
      // Send speech config
      ws.send(buildConfigMessage())
      // Send SSML request
      const ssml = buildSSML(text, voice, pitch, rate, volume)
      ws.send(buildSSMLMessage(ssml, requestId))
    }

    ws.onmessage = (event) => {
      if (event.data instanceof Blob) {
        event.data.arrayBuffer().then((buffer) => {
          const parsed = parseBinaryMessage(buffer)
          if (parsed.path === 'audio' && parsed.data && parsed.data.length > 0) {
            audioChunks.push(parsed.data)
          }
        })
      } else if (typeof event.data === 'string') {
        // Text message - check for turn.end
        if (event.data.includes('Path:turn.end')) {
          // Combine all audio chunks
          const totalLength = audioChunks.reduce((sum, chunk) => sum + chunk.length, 0)
          const result = new Uint8Array(totalLength)
          let offset = 0
          for (const chunk of audioChunks) {
            result.set(chunk, offset)
            offset += chunk.length
          }
          finish(result.buffer)
        }
      }
    }

    ws.onerror = (err) => {
      fail(new Error(`Edge TTS WebSocket error: ${err.message || 'connection failed'}`))
    }

    ws.onclose = (event) => {
      if (!resolved) {
        if (audioChunks.length > 0) {
          // We got some audio before close
          const totalLength = audioChunks.reduce((sum, chunk) => sum + chunk.length, 0)
          const result = new Uint8Array(totalLength)
          let offset = 0
          for (const chunk of audioChunks) {
            result.set(chunk, offset)
            offset += chunk.length
          }
          finish(result.buffer)
        } else {
          fail(new Error(`Edge TTS WebSocket closed: code=${event.code} reason=${event.reason}`))
        }
      }
    }
  })
}

/**
 * Play synthesized audio from Edge TTS
 * Returns true if successful
 */
export async function playEdgeTTS(text, options = {}) {
  try {
    const audioBuffer = await synthesize(text, options)
    const blob = new Blob([audioBuffer], { type: 'audio/mpeg' })
    const url = URL.createObjectURL(blob)

    return new Promise((resolve) => {
      const audio = new Audio(url)
      audio.onended = () => {
        URL.revokeObjectURL(url)
        resolve(true)
      }
      audio.onerror = () => {
        URL.revokeObjectURL(url)
        resolve(false)
      }
      audio.play().catch(() => {
        URL.revokeObjectURL(url)
        resolve(false)
      })
    })
  } catch {
    return false
  }
}

export default {
  synthesize,
  play: playEdgeTTS,
  ZH_VOICES,
}
