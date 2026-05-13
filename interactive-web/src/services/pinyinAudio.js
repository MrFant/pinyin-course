/**
 * Pinyin pronunciation audio service
 *
 * Uses Google Translate TTS to produce correct Chinese pinyin pronunciation.
 * The key insight: when Google TTS receives pinyin text with lang=zh-CN,
 * it reads "bo" as the Chinese syllable (like in "bo1" / "波"), NOT as
 * English letters "B" and "O".
 *
 * Falls back to Web Speech API if the TTS URL fails.
 */

// Cache for audio elements to avoid recreating them
const audioCache = new Map()

// Track failed URLs to avoid retrying immediately
const failedUrls = new Set()

/**
 * Build Google Translate TTS URL for a pinyin syllable
 */
function buildGoogleTTSUrl(text) {
  const encoded = encodeURIComponent(text)
  return `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=zh-CN&client=tw-ob`
}

/**
 * Preload audio for a pinyin syllable (returns the Audio element)
 */
function preloadAudio(text) {
  if (audioCache.has(text)) {
    return audioCache.get(text)
  }

  const url = buildGoogleTTSUrl(text)
  const audio = new Audio()
  audio.crossOrigin = 'anonymous'
  audio.preload = 'auto'
  audio.src = url

  audioCache.set(text, audio)
  return audio
}

/**
 * Play audio for a pinyin syllable using Google TTS.
 * Returns true if successful, false if failed.
 */
function playGoogleTTS(text) {
  return new Promise((resolve) => {
    // Don't retry recently failed URLs
    const url = buildGoogleTTSUrl(text)
    if (failedUrls.has(url)) {
      resolve(false)
      return
    }

    const audio = preloadAudio(text)

    // If audio is already loaded and ready
    if (audio.readyState >= 2) {
      audio.currentTime = 0
      audio.play()
        .then(() => resolve(true))
        .catch(() => {
          failedUrls.add(url)
          audioCache.delete(text)
          resolve(false)
        })
      return
    }

    // Wait for the audio to load
    const timeout = setTimeout(() => {
      failedUrls.add(url)
      audioCache.delete(text)
      resolve(false)
    }, 5000)

    audio.oncanplaythrough = () => {
      clearTimeout(timeout)
      audio.play()
        .then(() => resolve(true))
        .catch(() => {
          failedUrls.add(url)
          audioCache.delete(text)
          resolve(false)
        })
    }

    audio.onerror = () => {
      clearTimeout(timeout)
      failedUrls.add(url)
      audioCache.delete(text)
      resolve(false)
    }

    // Trigger load
    audio.load()
  })
}

/**
 * Play audio using Web Speech API as fallback
 */
function playWebSpeech(text) {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      resolve(false)
      return
    }

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'zh-CN'
    utterance.rate = 0.8
    utterance.pitch = 1

    utterance.onend = () => resolve(true)
    utterance.onerror = (e) => {
      if (e.error === 'canceled') {
        resolve(false)
      } else {
        resolve(false)
      }
    }

    window.speechSynthesis.speak(utterance)
  })
}

const PinyinAudioService = {
  /**
   * Play pronunciation for a pinyin syllable.
   * Tries Google TTS first, falls back to Web Speech API.
   * Returns true if playback started successfully.
   */
  async play(pinyin) {
    if (!pinyin || typeof pinyin !== 'string') return false

    const normalized = pinyin.trim().toLowerCase()
    if (!normalized) return false

    // Try Google TTS first
    const googleSuccess = await playGoogleTTS(normalized)
    if (googleSuccess) return true

    // Fallback to Web Speech API
    const speechSuccess = await playWebSpeech(normalized)
    return speechSuccess
  },

  /**
   * Cancel any ongoing playback
   */
  cancel() {
    window.speechSynthesis?.cancel()
    audioCache.forEach((audio) => {
      audio.pause()
      audio.currentTime = 0
    })
  },

  /**
   * Clear the cache and failed URL tracking
   */
  clearCache() {
    audioCache.clear()
    failedUrls.clear()
  },
}

export default PinyinAudioService
