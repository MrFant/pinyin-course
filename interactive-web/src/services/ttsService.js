/**
 * Multi-tier TTS Service for Chinese Pinyin Pronunciation
 *
 * Tries multiple sources in order of quality:
 * 1. Edge TTS WebSocket (Microsoft's free online TTS - best quality)
 * 2. Web Speech API (browser built-in, works with Chinese voices)
 * 3. Web Audio API synthesis (offline fallback, approximate tones)
 *
 * Each tier is tried only if the previous one fails.
 * Results are cached to avoid repeated failures.
 */

import edgeTts from './edgeTtsBrowser.js'
import webAudioTts from './webAudioTts.js'

// Track which tiers are working
const tierStatus = {
  edgeTts: 'unknown', // 'working' | 'failed' | 'unknown'
  webSpeech: 'unknown',
  webAudio: 'unknown',
}

// Cache for failed texts to avoid retrying immediately
const failedTexts = new Map() // text -> { tier, timestamp }
const FAILURE_COOLDOWN = 30000 // 30 seconds before retrying

/**
 * Check if a text recently failed on a specific tier
 */
function recentlyFailed(text, tier) {
  const entry = failedTexts.get(`${tier}:${text}`)
  if (!entry) return false
  return Date.now() - entry.timestamp < FAILURE_COOLDOWN
}

function markFailed(text, tier) {
  failedTexts.set(`${tier}:${text}`, { tier, timestamp: Date.now() })
}

/**
 * Play audio from a Blob URL
 */
function playBlob(blob) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(blob)
    const audio = new Audio(url)

    const cleanup = () => {
      URL.revokeObjectURL(url)
    }

    audio.onended = () => {
      cleanup()
      resolve(true)
    }

    audio.onerror = () => {
      cleanup()
      resolve(false)
    }

    audio.play().catch(() => {
      cleanup()
      resolve(false)
    })
  })
}

/**
 * Tier 1: Edge TTS (Microsoft's free online TTS)
 * Best quality, requires internet
 */
async function tryEdgeTTS(text) {
  if (tierStatus.edgeTts === 'failed' || recentlyFailed(text, 'edgeTts')) {
    return false
  }

  try {
    const audioBuffer = await edgeTts.synthesize(text, {
      voice: 'zh-CN-XiaoxiaoNeural',
      timeout: 8000,
    })
    const blob = new Blob([audioBuffer], { type: 'audio/mpeg' })
    const success = await playBlob(blob)
    if (success) {
      tierStatus.edgeTts = 'working'
    }
    return success
  } catch (err) {
    console.warn('Edge TTS failed:', err.message)
    tierStatus.edgeTts = 'failed'
    markFailed(text, 'edgeTts')
    return false
  }
}

/**
 * Tier 2: Web Speech API
 * Browser built-in, works with Chinese voices on some systems
 */
async function tryWebSpeech(text) {
  if (tierStatus.webSpeech === 'failed' || recentlyFailed(text, 'webSpeech')) {
    return false
  }

  if (!('speechSynthesis' in window)) {
    tierStatus.webSpeech = 'failed'
    return false
  }

  return new Promise((resolve) => {
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'zh-CN'
    utterance.rate = 0.8
    utterance.pitch = 1

    // Try to find a Chinese voice
    const voices = window.speechSynthesis.getVoices()
    const zhVoice = voices.find(
      (v) => v.lang.startsWith('zh') && v.localService === false
    ) || voices.find((v) => v.lang.startsWith('zh'))

    if (zhVoice) {
      utterance.voice = zhVoice
    }

    const timeout = setTimeout(() => {
      tierStatus.webSpeech = 'failed'
      markFailed(text, 'webSpeech')
      resolve(false)
    }, 5000)

    utterance.onend = () => {
      clearTimeout(timeout)
      tierStatus.webSpeech = 'working'
      resolve(true)
    }

    utterance.onerror = (e) => {
      clearTimeout(timeout)
      if (e.error === 'canceled') {
        resolve(false)
      } else {
        tierStatus.webSpeech = 'failed'
        markFailed(text, 'webSpeech')
        resolve(false)
      }
    }

    window.speechSynthesis.speak(utterance)
  })
}

/**
 * Tier 3: Web Audio API synthesis
 * Offline fallback, generates approximate tones
 */
async function tryWebAudio(text) {
  if (tierStatus.webAudio === 'failed') {
    return false
  }

  try {
    const success = await webAudioTts.play(text)
    if (success) {
      tierStatus.webAudio = 'working'
    }
    return success
  } catch (err) {
    console.warn('Web Audio synthesis failed:', err)
    tierStatus.webAudio = 'failed'
    return false
  }
}

/**
 * Main play function - tries all tiers in order
 */
async function play(text) {
  if (!text || typeof text !== 'string') return false

  const normalized = text.trim().toLowerCase()
  if (!normalized) return false

  // Try Tier 1: Edge TTS
  if (await tryEdgeTTS(normalized)) return true

  // Try Tier 2: Web Speech API
  if (await tryWebSpeech(normalized)) return true

  // Try Tier 3: Web Audio synthesis
  if (await tryWebAudio(normalized)) return true

  return false
}

/**
 * Cancel any ongoing playback
 */
function cancel() {
  window.speechSynthesis?.cancel()
}

/**
 * Get current tier status (for debugging)
 */
function getStatus() {
  return { ...tierStatus }
}

/**
 * Reset tier status (for retrying after network comes back)
 */
function resetStatus() {
  tierStatus.edgeTts = 'unknown'
  tierStatus.webSpeech = 'unknown'
  tierStatus.webAudio = 'unknown'
  failedTexts.clear()
}

// Ensure voices are loaded (some browsers load them asynchronously)
if ('speechSynthesis' in window) {
  // Trigger voice loading
  window.speechSynthesis.getVoices()
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices()
  }
}

const TtsService = {
  play,
  cancel,
  getStatus,
  resetStatus,
}

export default TtsService
