/**
 * Web Audio API-based pinyin tone synthesizer
 *
 * Generates approximate Chinese pinyin sounds using formant synthesis.
 * This is a fallback when no network TTS is available.
 *
 * The approach:
 * 1. Parse pinyin into initial + final + tone
 * 2. Generate vowel formants for the final
 * 3. Apply tone as pitch contour
 * 4. Add noise component for consonant initials
 *
 * This produces recognizable tones but not natural speech.
 * Useful as a last-resort offline fallback.
 */

// Formant frequencies for Chinese pinyin finals (F1, F2, F3 in Hz)
// These are approximate values based on acoustic phonetics research
const FINAL_FORMANTS = {
  // Simple finals
  a: { f1: 750, f2: 1200, f3: 2500, duration: 0.4 },
  o: { f1: 500, f2: 900, f3: 2500, duration: 0.4 },
  e: { f1: 450, f2: 1300, f3: 2500, duration: 0.4 },
  i: { f1: 280, f2: 2300, f3: 3000, duration: 0.35 },
  u: { f1: 300, f2: 700, f3: 2500, duration: 0.4 },
  v: { f1: 280, f2: 1900, f3: 2700, duration: 0.35 }, // ü
  ai: { f1: 600, f2: 1800, f3: 2600, duration: 0.5 },
  ei: { f1: 450, f2: 1900, f3: 2600, duration: 0.5 },
  ao: { f1: 700, f2: 1100, f3: 2500, duration: 0.5 },
  ou: { f1: 450, f2: 800, f3: 2500, duration: 0.5 },
  an: { f1: 650, f2: 1200, f3: 2500, duration: 0.45 },
  en: { f1: 500, f2: 1500, f3: 2500, duration: 0.45 },
  ang: { f1: 700, f2: 1100, f3: 2500, duration: 0.5 },
  eng: { f1: 450, f2: 1400, f3: 2500, duration: 0.5 },
  ong: { f1: 450, f2: 800, f3: 2500, duration: 0.5 },
  er: { f1: 500, f2: 1400, f3: 2500, duration: 0.4 },
  // Compound finals
  ia: { f1: 350, f2: 2000, f3: 2800, duration: 0.45 },
  ie: { f1: 350, f2: 2100, f3: 2800, duration: 0.4 },
  iao: { f1: 350, f2: 2000, f3: 2800, duration: 0.55 },
  iou: { f1: 350, f2: 2000, f3: 2800, duration: 0.5 },
  ian: { f1: 350, f2: 2000, f3: 2800, duration: 0.5 },
  in: { f1: 300, f2: 2300, f3: 3000, duration: 0.4 },
  iang: { f1: 350, f2: 2000, f3: 2800, duration: 0.55 },
  ing: { f1: 300, f2: 2300, f3: 3000, duration: 0.45 },
  ua: { f1: 350, f2: 700, f3: 2500, duration: 0.45 },
  uo: { f1: 350, f2: 700, f3: 2500, duration: 0.45 },
  uai: { f1: 350, f2: 700, f3: 2500, duration: 0.55 },
  ui: { f1: 320, f2: 800, f3: 2500, duration: 0.45 },
  uan: { f1: 350, f2: 700, f3: 2500, duration: 0.5 },
  un: { f1: 320, f2: 800, f3: 2500, duration: 0.45 },
  uang: { f1: 350, f2: 700, f3: 2500, duration: 0.55 },
  ue: { f1: 300, f2: 1800, f3: 2700, duration: 0.45 },
  van: { f1: 300, f2: 1800, f3: 2700, duration: 0.5 },
  vn: { f1: 300, f2: 1900, f3: 2700, duration: 0.4 },
}

// Tone pitch contours (normalized 0-1 over time)
// Each tone is an array of [time, pitch] pairs
const TONE_CONTOURS = {
  1: [[0, 1.0], [1, 1.0]], // High flat
  2: [[0, 0.4], [0.5, 0.7], [1, 1.0]], // Rising
  3: [[0, 0.5], [0.3, 0.2], [0.7, 0.3], [1, 0.6]], // Dip (simplified)
  4: [[0, 1.0], [0.5, 0.6], [1, 0.2]], // Falling
  5: [[0, 0.5], [1, 0.4]], // Neutral (short, low)
}

// Initial consonant noise characteristics
const INITIAL_NOISE = {
  b: { type: 'burst', freq: 200, duration: 0.03 },
  p: { type: 'burst', freq: 250, duration: 0.04 },
  m: { type: 'nasal', freq: 250, duration: 0.08 },
  f: { type: 'fricative', freq: 4000, duration: 0.08 },
  d: { type: 'burst', freq: 300, duration: 0.02 },
  t: { type: 'burst', freq: 350, duration: 0.03 },
  n: { type: 'nasal', freq: 250, duration: 0.08 },
  l: { type: 'liquid', freq: 300, duration: 0.06 },
  g: { type: 'burst', freq: 350, duration: 0.02 },
  k: { type: 'burst', freq: 400, duration: 0.03 },
  h: { type: 'fricative', freq: 3000, duration: 0.08 },
  j: { type: 'affricate', freq: 3500, duration: 0.06 },
  q: { type: 'affricate', freq: 4000, duration: 0.07 },
  x: { type: 'fricative', freq: 4500, duration: 0.08 },
  zh: { type: 'affricate', freq: 3000, duration: 0.07 },
  ch: { type: 'affricate', freq: 3500, duration: 0.08 },
  sh: { type: 'fricative', freq: 3500, duration: 0.08 },
  r: { type: 'liquid', freq: 350, duration: 0.06 },
  z: { type: 'affricate', freq: 3500, duration: 0.05 },
  c: { type: 'affricate', freq: 4000, duration: 0.06 },
  s: { type: 'fricative', freq: 4500, duration: 0.06 },
  y: { type: 'approximant', freq: 250, duration: 0.04 },
  w: { type: 'approximant', freq: 200, duration: 0.04 },
}

/**
 * Parse pinyin into initial, final, and tone
 */
function parsePinyin(pinyin) {
  const clean = pinyin.trim().toLowerCase()

  // Extract tone number
  let tone = 5 // default neutral
  let syllable = clean
  const toneMatch = clean.match(/([1-5])$/)
  if (toneMatch) {
    tone = parseInt(toneMatch[1])
    syllable = clean.slice(0, -1)
  }

  // Try to find the longest matching initial
  let initial = ''
  let final_ = syllable

  const initials = ['zh', 'ch', 'sh', 'b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'z', 'c', 's', 'r', 'y', 'w']
  for (const init of initials) {
    if (syllable.startsWith(init)) {
      initial = init
      final_ = syllable.slice(init.length)
      break
    }
  }

  // Normalize final
  if (final_ === 'v') final_ = 'v' // ü
  if (final_ === '') final_ = 'e' // some syllables like "zh" need a vowel

  return { initial, final: final_, tone }
}

/**
 * Interpolate tone contour at a given time (0-1)
 */
function getTonePitch(time, tone) {
  const contour = TONE_CONTOURS[tone] || TONE_CONTOURS[5]

  // Find the two surrounding points
  let lower = contour[0]
  let upper = contour[contour.length - 1]

  for (let i = 0; i < contour.length - 1; i++) {
    if (time >= contour[i][0] && time <= contour[i + 1][0]) {
      lower = contour[i]
      upper = contour[i + 1]
      break
    }
  }

  // Linear interpolation
  const range = upper[0] - lower[0]
  if (range === 0) return lower[1]
  const t = (time - lower[0]) / range
  return lower[1] + (upper[1] - lower[1]) * t
}

/**
 * Create a formant oscillator at a given frequency
 */
function createFormant(ctx, frequency, gain, duration) {
  const osc = ctx.createOscillator()
  const gainNode = ctx.createGain()
  const filter = ctx.createBiquadFilter()

  osc.type = 'sawtooth'
  osc.frequency.value = frequency

  filter.type = 'bandpass'
  filter.frequency.value = frequency
  filter.Q.value = 5

  gainNode.gain.value = gain

  osc.connect(filter)
  filter.connect(gainNode)

  return { osc, gainNode, filter }
}

/**
 * Synthesize audio for a pinyin syllable
 * Returns an AudioBuffer
 */
export async function synthesizePinyin(pinyin, sampleRate = 24000) {
  const { initial, final: finalName, tone } = parsePinyin(pinyin)

  const finalData = FINAL_FORMANTS[finalName] || FINAL_FORMANTS.e
  const totalDuration = finalData.duration + (INITIAL_NOISE[initial]?.duration || 0)

  const offlineCtx = new OfflineAudioContext(1, sampleRate * totalDuration, sampleRate)
  const duration = totalDuration

  // Base frequency for the voice (female voice ~220Hz, male ~120Hz)
  const baseFreq = 220

  // Create vowel formants
  const formant1 = createFormant(offlineCtx, finalData.f1, 0.15, duration)
  const formant2 = createFormant(offlineCtx, finalData.f2, 0.1, duration)
  const formant3 = createFormant(offlineCtx, finalData.f3, 0.05, duration)

  // Apply tone modulation to all formants
  const startTime = INITIAL_NOISE[initial]?.duration || 0
  const vowelDuration = finalData.duration

  // Create a gain envelope for the vowel
  const vowelGain = offlineCtx.createGain()
  vowelGain.gain.setValueAtTime(0, startTime)
  vowelGain.gain.linearRampToValueAtTime(1, startTime + 0.02)
  vowelGain.gain.setValueAtTime(1, startTime + vowelDuration - 0.02)
  vowelGain.gain.linearRampToValueAtTime(0, startTime + vowelDuration)

  // Modulate oscillator frequencies for tone
  const now = startTime
  for (const { osc } of [formant1, formant2, formant3]) {
    // Apply pitch variation based on tone
    const steps = 20
    for (let i = 0; i < steps; i++) {
      const t = i / steps
      const pitchMult = getTonePitch(t, tone)
      const freq = osc.frequency.value * (0.8 + 0.4 * pitchMult)
      const time = now + t * vowelDuration
      osc.frequency.setValueAtTime(freq, time)
    }
  }

  // Connect formants
  formant1.gainNode.connect(vowelGain)
  formant2.gainNode.connect(vowelGain)
  formant3.gainNode.connect(vowelGain)
  vowelGain.connect(offlineCtx.destination)

  // Start formants at the right time
  formant1.osc.start(startTime)
  formant2.osc.start(startTime)
  formant3.osc.start(startTime)
  formant1.osc.stop(startTime + vowelDuration)
  formant2.osc.stop(startTime + vowelDuration)
  formant3.osc.stop(startTime + vowelDuration)

  // Add initial consonant noise if present
  if (initial && INITIAL_NOISE[initial]) {
    const noiseData = INITIAL_NOISE[initial]
    const noiseBuffer = offlineCtx.createBuffer(1, sampleRate * noiseData.duration, sampleRate)
    const noiseDataArr = noiseBuffer.getChannelData(0)

    // Generate noise
    for (let i = 0; i < noiseDataArr.length; i++) {
      noiseDataArr[i] = (Math.random() * 2 - 1) * 0.3
    }

    const noiseSource = offlineCtx.createBufferSource()
    noiseSource.buffer = noiseBuffer

    const noiseGain = offlineCtx.createGain()
    noiseGain.gain.setValueAtTime(0.2, 0)
    noiseGain.gain.linearRampToValueAtTime(0, noiseData.duration)

    const noiseFilter = offlineCtx.createBiquadFilter()
    noiseFilter.type = 'bandpass'
    noiseFilter.frequency.value = noiseData.freq
    noiseFilter.Q.value = 2

    noiseSource.connect(noiseFilter)
    noiseFilter.connect(noiseGain)
    noiseGain.connect(offlineCtx.destination)

    noiseSource.start(0)
    noiseSource.stop(noiseData.duration)
  }

  // Render
  const audioBuffer = await offlineCtx.startRendering()
  return audioBuffer
}

/**
 * Play synthesized pinyin audio
 * Returns true if successful
 */
export async function playPinyinSynth(pinyin) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const audioBuffer = await synthesizePinyin(pinyin, ctx.sampleRate)

    const source = ctx.createBufferSource()
    source.buffer = audioBuffer
    source.connect(ctx.destination)

    return new Promise((resolve) => {
      source.onended = () => {
        ctx.close()
        resolve(true)
      }
      source.start()
    })
  } catch (err) {
    console.warn('Web Audio synthesis failed:', err)
    return false
  }
}

export default {
  synthesize: synthesizePinyin,
  play: playPinyinSynth,
  parsePinyin,
}
