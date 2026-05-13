import styles from './FinalDiagram.module.css'

const finalShapes = {
  a: {
    mouthWidth: 50,
    mouthHeight: 35,
    lipRound: false,
    tonguePos: 'low',
    description: '开口大，舌头放低',
    color: '#e17055'
  },
  o: {
    mouthWidth: 35,
    mouthHeight: 30,
    lipRound: true,
    tonguePos: 'mid',
    description: '嘴唇圆起来，开口中等',
    color: '#00b894'
  },
  e: {
    mouthWidth: 40,
    mouthHeight: 25,
    lipRound: false,
    tonguePos: 'mid',
    description: '嘴唇不圆，开口中等',
    color: '#6c5ce7'
  },
  i: {
    mouthWidth: 45,
    mouthHeight: 12,
    lipRound: false,
    tonguePos: 'high-front',
    description: '嘴唇扁平，开口小',
    color: '#0984e3'
  },
  u: {
    mouthWidth: 20,
    mouthHeight: 25,
    lipRound: true,
    tonguePos: 'high-back',
    description: '嘴唇圆小',
    color: '#fdcb6e'
  },
  'ü': {
    mouthWidth: 20,
    mouthHeight: 20,
    lipRound: true,
    tonguePos: 'high-front',
    description: '嘴唇圆并前突',
    color: '#fd79a8'
  },
}

function FinalDiagram({ final, showLabel = true }) {
  const data = finalShapes[final] || finalShapes['a']
  const centerX = 60
  const centerY = 55

  return (
    <div className={styles.container}>
      <svg viewBox="0 0 120 100" className={styles.svg}>
        {/* Face outline */}
        <ellipse cx="60" cy="50" rx="50" ry="45" fill="#ffeaa7" stroke="#fdcb6e" strokeWidth="2" />

        {/* Eyes */}
        <circle cx="40" cy="35" r="5" fill="#2d3436" />
        <circle cx="80" cy="35" r="5" fill="#2d3436" />

        {/* Mouth shape */}
        {data.lipRound ? (
          <ellipse
            cx={centerX}
            cy={centerY}
            rx={data.mouthWidth / 2}
            ry={data.mouthHeight / 2}
            fill={data.color}
            className={styles.mouthShape}
          />
        ) : (
          <ellipse
            cx={centerX}
            cy={centerY}
            rx={data.mouthWidth / 2}
            ry={data.mouthHeight / 2}
            fill={data.color}
            className={styles.mouthShape}
          />
        )}

        {/* Lip rounding indicator */}
        {data.lipRound && (
          <g className={styles.roundIndicator}>
            <circle cx="35" cy="55" r="6" fill="none" stroke={data.color} strokeWidth="2" strokeDasharray="3,2" />
            <circle cx="85" cy="55" r="6" fill="none" stroke={data.color} strokeWidth="2" strokeDasharray="3,2" />
          </g>
        )}

        {/* Tongue position indicator */}
        {data.tonguePos === 'high-front' && (
          <path d="M 40 70 Q 60 55 80 70" fill="#ff7675" stroke="#d63031" strokeWidth="1" opacity="0.7" />
        )}
        {data.tonguePos === 'high-back' && (
          <path d="M 40 70 Q 50 60 60 65 Q 70 60 80 70" fill="#ff7675" stroke="#d63031" strokeWidth="1" opacity="0.7" />
        )}
        {data.tonguePos === 'mid' && (
          <path d="M 40 72 Q 60 62 80 72" fill="#ff7675" stroke="#d63031" strokeWidth="1" opacity="0.7" />
        )}
        {data.tonguePos === 'low' && (
          <path d="M 40 75 Q 60 70 80 75" fill="#ff7675" stroke="#d63031" strokeWidth="1" opacity="0.7" />
        )}
      </svg>

      {showLabel && (
        <div className={styles.label}>
          <span className={styles.tongueBadge} data-type={data.tonguePos}>
            {data.tonguePos === 'high-front' ? '舌前高' :
             data.tonguePos === 'high-back' ? '舌后高' :
             data.tonguePos === 'mid' ? '舌中位' : '舌低位'}
          </span>
          <p className={styles.description}>{data.description}</p>
        </div>
      )}
    </div>
  )
}

export default FinalDiagram
