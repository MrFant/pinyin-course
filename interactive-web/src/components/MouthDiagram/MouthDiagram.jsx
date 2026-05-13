import styles from './MouthDiagram.module.css'

const mouthPositions = {
  b: { lips: 'closed', airflow: 'weak', description: '双唇紧闭，突然打开' },
  p: { lips: 'closed', airflow: 'strong', description: '双唇紧闭，气流强' },
  m: { lips: 'closed', airflow: 'nose', description: '双唇紧闭，鼻腔出气' },
  f: { lips: 'teeth-lip', airflow: 'weak', description: '上齿轻触下唇' },
  d: { lips: 'open', airflow: 'weak', description: '舌尖抵住上齿龈' },
  t: { lips: 'open', airflow: 'strong', description: '舌尖抵住上齿龈，气流强' },
  n: { lips: 'open', airflow: 'nose', description: '舌尖抵住上齿龈，鼻腔出气' },
  l: { lips: 'open', airflow: 'sides', description: '舌尖抵住上齿龈，两边出气' },
}

function MouthDiagram({ initial, showLabel = true }) {
  const pos = mouthPositions[initial] || { lips: 'open', airflow: 'weak', description: '' }

  return (
    <div className={styles.container}>
      <svg viewBox="0 0 120 100" className={styles.svg}>
        {/* Face outline */}
        <ellipse cx="60" cy="50" rx="50" ry="45" fill="#ffeaa7" stroke="#fdcb6e" strokeWidth="2" />

        {/* Eyes */}
        <circle cx="40" cy="35" r="5" fill="#2d3436" />
        <circle cx="80" cy="35" r="5" fill="#2d3436" />

        {/* Mouth based on position */}
        {pos.lips === 'closed' ? (
          <line x1="40" y1="65" x2="80" y2="65" stroke="#d63031" strokeWidth="4" strokeLinecap="round" />
        ) : pos.lips === 'teeth-lip' ? (
          <>
            <rect x="45" y="58" width="30" height="8" fill="white" stroke="#dfe6e9" strokeWidth="1" />
            <path d="M 40 70 Q 60 75 80 70" fill="none" stroke="#d63031" strokeWidth="3" />
          </>
        ) : (
          <ellipse cx="60" cy="65" rx="18" ry="10" fill="#d63031" />
        )}

        {/* Airflow indicator */}
        {pos.airflow === 'strong' && (
          <g className={styles.airflow}>
            <path d="M 60 78 L 60 95" stroke="#0984e3" strokeWidth="2" markerEnd="url(#arrow)" />
          </g>
        )}
        {pos.airflow === 'nose' && (
          <g className={styles.airflow}>
            <path d="M 60 45 L 60 25" stroke="#00b894" strokeWidth="2" markerEnd="url(#arrowNose)" />
          </g>
        )}
        {pos.airflow === 'sides' && (
          <g className={styles.airflow}>
            <path d="M 40 72 L 25 80" stroke="#fdcb6e" strokeWidth="2" markerEnd="url(#arrowSideLeft)" />
            <path d="M 80 72 L 95 80" stroke="#fdcb6e" strokeWidth="2" markerEnd="url(#arrowSideRight)" />
          </g>
        )}

        {/* Arrow markers */}
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#0984e3" />
          </marker>
          <marker id="arrowNose" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#00b894" />
          </marker>
          <marker id="arrowSideLeft" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="10 0, 0 3.5, 10 7" fill="#fdcb6e" />
          </marker>
          <marker id="arrowSideRight" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#fdcb6e" />
          </marker>
        </defs>
      </svg>

      {showLabel && (
        <div className={styles.label}>
          <span className={styles.airflowBadge} data-type={pos.airflow}>
            {pos.airflow === 'strong' ? '送气' : pos.airflow === 'nose' ? '鼻音' : pos.airflow === 'sides' ? '边音' : '不送气'}
          </span>
          <p className={styles.description}>{pos.description}</p>
        </div>
      )}
    </div>
  )
}

export default MouthDiagram
