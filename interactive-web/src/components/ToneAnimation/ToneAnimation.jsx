import { useState, useEffect, useCallback } from 'react'
import styles from './ToneAnimation.module.css'

const toneData = {
  1: {
    path: 'M 10 30 L 90 30',
    color: '#e17055',
    name: '阴平',
    value: '55',
    description: '高而平',
    audioFreq: 440,
    audioPattern: 'flat',
    symbol: '̄'  // macron
  },
  2: {
    path: 'M 10 50 L 90 20',
    color: '#00b894',
    name: '阳平',
    value: '35',
    description: '由中升高',
    audioFreq: 330,
    audioPattern: 'rising',
    symbol: '́'  // acute
  },
  3: {
    path: 'M 10 20 L 50 60 L 90 30',
    color: '#6c5ce7',
    name: '上声',
    value: '214',
    description: '先降后升',
    audioFreq: 280,
    audioPattern: 'dip',
    symbol: '̌'  // caron
  },
  4: {
    path: 'M 10 20 L 90 60',
    color: '#d63031',
    name: '去声',
    value: '51',
    description: '由高降低',
    audioFreq: 400,
    audioPattern: 'falling',
    symbol: '̀'  // grave
  },
}

// AudioContext singleton
let audioContext = null
const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioContext
}

// Play tone sound based on pattern
const playToneSound = (pattern, baseFreq) => {
  try {
    const ctx = getAudioContext()
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.type = 'sine'
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime)

    const duration = 1.2
    const now = ctx.currentTime

    switch (pattern) {
      case 'flat':
        oscillator.frequency.setValueAtTime(baseFreq, now)
        oscillator.frequency.setValueAtTime(baseFreq, now + duration)
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration)
        break
      case 'rising':
        oscillator.frequency.setValueAtTime(baseFreq * 0.7, now)
        oscillator.frequency.linearRampToValueAtTime(baseFreq * 1.2, now + duration * 0.8)
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration)
        break
      case 'dip':
        oscillator.frequency.setValueAtTime(baseFreq * 0.9, now)
        oscillator.frequency.linearRampToValueAtTime(baseFreq * 0.6, now + duration * 0.4)
        oscillator.frequency.linearRampToValueAtTime(baseFreq * 1.1, now + duration * 0.9)
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration)
        break
      case 'falling':
        oscillator.frequency.setValueAtTime(baseFreq * 1.3, now)
        oscillator.frequency.linearRampToValueAtTime(baseFreq * 0.5, now + duration * 0.8)
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration)
        break
      default:
        oscillator.frequency.setValueAtTime(baseFreq, now)
    }

    oscillator.start(now)
    oscillator.stop(now + duration)
  } catch (e) {
    console.warn('Audio playback failed:', e)
  }
}

function ToneAnimation({ tone = 1, autoPlay = false, playSound = false }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [animationProgress, setAnimationProgress] = useState(0)
  const data = toneData[tone] || toneData[1]

  const playAnimation = useCallback(() => {
    if (isPlaying) return
    setIsPlaying(true)
    setAnimationProgress(0)

    if (playSound) {
      playToneSound(data.audioPattern, data.audioFreq)
    }

    // Animate progress for path drawing
    const startTime = Date.now()
    const duration = 1200

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      setAnimationProgress(progress)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setIsPlaying(false)
      }
    }

    requestAnimationFrame(animate)
  }, [isPlaying, playSound, data])

  useEffect(() => {
    if (autoPlay) {
      playAnimation()
    }
  }, [autoPlay, playAnimation])

  // Calculate path length for dash animation
  const getPathLength = () => {
    switch (tone) {
      case 1: return 80
      case 2: return 110
      case 3: return 140
      case 4: return 100
      default: return 80
    }
  }

  const pathLength = getPathLength()
  const dashOffset = isPlaying ? pathLength * (1 - animationProgress) : 0

  return (
    <div className={styles.container}>
      <div className={styles.toneHeader}>
        <div className={styles.toneName}>
          第{tone}声 · {data.name}
        </div>
        <div className={styles.toneSymbol} style={{ color: data.color }}>
          a{data.symbol}
        </div>
      </div>

      <svg viewBox="0 0 100 80" className={styles.svg}>
        {/* Grid lines with labels */}
        <g className={styles.gridLines}>
          <line x1="15" y1="15" x2="90" y2="15" stroke="#f0f0f0" strokeWidth="1" />
          <line x1="15" y1="30" x2="90" y2="30" stroke="#f0f0f0" strokeWidth="1" />
          <line x1="15" y1="45" x2="90" y2="45" stroke="#f0f0f0" strokeWidth="1" />
          <line x1="15" y1="60" x2="90" y2="60" stroke="#f0f0f0" strokeWidth="1" />
        </g>

        {/* Tone value labels on left */}
        <text x="8" y="18" fontSize="8" fill="#999" textAnchor="middle">5</text>
        <text x="8" y="33" fontSize="8" fill="#999" textAnchor="middle">4</text>
        <text x="8" y="48" fontSize="8" fill="#999" textAnchor="middle">3</text>
        <text x="8" y="63" fontSize="8" fill="#999" textAnchor="middle">2</text>
        <text x="8" y="73" fontSize="8" fill="#999" textAnchor="middle">1</text>

        {/* Tone path with animation */}
        <path
          d={data.path}
          fill="none"
          stroke={data.color}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLength}
          strokeDashoffset={dashOffset}
          style={{
            transition: isPlaying ? 'none' : 'stroke-dashoffset 0.3s ease-out',
            filter: isPlaying ? `drop-shadow(0 0 4px ${data.color})` : 'none'
          }}
        />

        {/* Animated dot at current position */}
        {isPlaying && (
          <circle
            cx={getDotPosition(data.path, animationProgress).x}
            cy={getDotPosition(data.path, animationProgress).y}
            r="4"
            fill={data.color}
            className={styles.animatedDot}
          />
        )}
      </svg>

      <div className={styles.info}>
        <div className={styles.valueRow}>
          <span className={styles.value} style={{ color: data.color }}>
            调值: {data.value}
          </span>
        </div>
        <span className={styles.desc}>{data.description}</span>
      </div>

      <button
        className={`${styles.playBtn} ${isPlaying ? styles.playing : ''}`}
        onClick={playAnimation}
        disabled={isPlaying}
      >
        {isPlaying ? '播放中...' : '播放动画'}
      </button>
    </div>
  )
}

// Helper function to get dot position along the path
function getDotPosition(pathD, progress) {
  // Parse path and interpolate position
  const points = parsePathPoints(pathD)
  if (points.length === 0) return { x: 10, y: 30 }

  const totalSegments = points.length - 1
  const segmentProgress = progress * totalSegments
  const segmentIndex = Math.min(Math.floor(segmentProgress), totalSegments - 1)
  const localProgress = segmentProgress - segmentIndex

  const start = points[segmentIndex]
  const end = points[Math.min(segmentIndex + 1, points.length - 1)]

  return {
    x: start.x + (end.x - start.x) * localProgress,
    y: start.y + (end.y - start.y) * localProgress,
  }
}

function parsePathPoints(pathD) {
  const points = []
  const regex = /([ML])\s*(\d+)\s+(\d+)/g
  let match

  while ((match = regex.exec(pathD)) !== null) {
    points.push({
      x: parseInt(match[2]),
      y: parseInt(match[3]),
    })
  }

  return points
}

export default ToneAnimation
