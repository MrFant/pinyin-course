import styles from './MouthDiagram.module.css'

const mouthPositions = {
  // 双唇音
  b: { lips: 'closed', airflow: 'weak', description: '双唇紧闭，突然打开，气流弱', tongue: 'none' },
  p: { lips: 'closed', airflow: 'strong', description: '双唇紧闭，突然打开，气流强', tongue: 'none' },
  m: { lips: 'closed', airflow: 'nose', description: '双唇紧闭，鼻腔出气', tongue: 'none' },
  // 唇齿音
  f: { lips: 'teeth-lip', airflow: 'weak', description: '上齿轻触下唇', tongue: 'none' },
  // 舌尖前音
  z: { lips: 'open', airflow: 'weak', description: '舌尖抵住上齿背', tongue: 'front-flat' },
  c: { lips: 'open', airflow: 'strong', description: '舌尖抵住上齿背，气流强', tongue: 'front-flat' },
  s: { lips: 'open', airflow: 'weak', description: '舌尖接近上齿背', tongue: 'front-flat' },
  // 舌尖中音
  d: { lips: 'open', airflow: 'weak', description: '舌尖抵住上齿龈', tongue: 'tip-up' },
  t: { lips: 'open', airflow: 'strong', description: '舌尖抵住上齿龈，气流强', tongue: 'tip-up' },
  n: { lips: 'open', airflow: 'nose', description: '舌尖抵住上齿龈，鼻腔出气', tongue: 'tip-up' },
  l: { lips: 'open', airflow: 'sides', description: '舌尖抵住上齿龈，两边出气', tongue: 'tip-up' },
  // 舌尖后音
  zh: { lips: 'open', airflow: 'weak', description: '舌尖翘起抵住硬腭', tongue: 'curled' },
  ch: { lips: 'open', airflow: 'strong', description: '舌尖翘起抵住硬腭，气流强', tongue: 'curled' },
  sh: { lips: 'open', airflow: 'weak', description: '舌尖翘起接近硬腭', tongue: 'curled' },
  r: { lips: 'open', airflow: 'weak', description: '舌尖翘起，声带振动', tongue: 'curled' },
  // 舌面音
  j: { lips: 'open', airflow: 'weak', description: '舌面前部抵住硬腭', tongue: 'roof' },
  q: { lips: 'open', airflow: 'strong', description: '舌面前部抵住硬腭，气流强', tongue: 'roof' },
  x: { lips: 'open', airflow: 'weak', description: '舌面前部接近硬腭', tongue: 'roof' },
  // 舌根音
  g: { lips: 'open', airflow: 'weak', description: '舌根抵住软腭', tongue: 'back' },
  k: { lips: 'open', airflow: 'strong', description: '舌根抵住软腭，气流强', tongue: 'back' },
  h: { lips: 'open', airflow: 'weak', description: '舌根接近软腭', tongue: 'back' },
}

function MouthDiagram({ initial, showLabel = true }) {
  const pos = mouthPositions[initial] || { lips: 'open', airflow: 'weak', description: '', tongue: 'none' }

  return (
    <div className={styles.container}>
      <svg viewBox="0 0 120 100" className={styles.svg}>
        {/* Face outline */}
        <ellipse cx="60" cy="50" rx="50" ry="45" fill="#ffeaa7" stroke="#fdcb6e" strokeWidth="2" />

        {/* Eyes */}
        <circle cx="40" cy="35" r="5" fill="#2d3436" />
        <circle cx="80" cy="35" r="5" fill="#2d3436" />

        {/* Tongue visualization based on type */}
        {pos.tongue !== 'none' && (
          <g className={styles.tongue}>
            {pos.tongue === 'front-flat' && (
              <>
                {/* 舌尖前音: tongue flat against teeth */}
                <path d="M 35 60 Q 60 55 85 60" fill="#ff7675" stroke="#d63031" strokeWidth="1" />
                <text x="60" y="75" textAnchor="middle" fontSize="6" fill="#636e72">舌尖平</text>
              </>
            )}
            {pos.tongue === 'tip-up' && (
              <>
                {/* 舌尖中音: tongue tip touching alveolar ridge */}
                <path d="M 35 62 Q 60 50 85 62" fill="#ff7675" stroke="#d63031" strokeWidth="1" />
                <text x="60" y="75" textAnchor="middle" fontSize="6" fill="#636e72">舌尖上</text>
              </>
            )}
            {pos.tongue === 'curled' && (
              <>
                {/* 舌尖后音: tongue curled up */}
                <path d="M 35 65 Q 55 45 75 55 Q 85 60 85 65" fill="#ff7675" stroke="#d63031" strokeWidth="1" />
                <text x="60" y="78" textAnchor="middle" fontSize="6" fill="#636e72">舌尖翘</text>
              </>
            )}
            {pos.tongue === 'roof' && (
              <>
                {/* 舌面音: tongue touching roof */}
                <path d="M 35 65 Q 60 35 85 65" fill="#ff7675" stroke="#d63031" strokeWidth="1" />
                <text x="60" y="80" textAnchor="middle" fontSize="6" fill="#636e72">舌面贴</text>
              </>
            )}
            {pos.tongue === 'back' && (
              <>
                {/* 舌根音: tongue back raised */}
                <path d="M 35 68 Q 45 65 55 60 Q 65 65 85 68" fill="#ff7675" stroke="#d63031" strokeWidth="1" />
                <text x="60" y="80" textAnchor="middle" fontSize="6" fill="#636e72">舌根起</text>
              </>
            )}
          </g>
        )}

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
