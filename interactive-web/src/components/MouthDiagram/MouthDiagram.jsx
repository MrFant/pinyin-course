import styles from './MouthDiagram.module.css'

const mouthPositions = {
  // 双唇音 (bilabial)
  b: { lips: 'closed', airflow: 'weak', description: '双唇紧闭，突然打开，气流弱', tongue: 'none', category: '双唇音' },
  p: { lips: 'closed', airflow: 'strong', description: '双唇紧闭，突然打开，气流强', tongue: 'none', category: '双唇音' },
  m: { lips: 'closed', airflow: 'nose', description: '双唇紧闭，鼻腔出气', tongue: 'none', category: '双唇音' },
  // 唇齿音 (labiodental)
  f: { lips: 'teeth-lip', airflow: 'weak', description: '上齿轻触下唇', tongue: 'none', category: '唇齿音' },
  // 舌尖前音 (dental/alveolar sibilant)
  z: { lips: 'open-slight', airflow: 'weak', description: '舌尖抵住上齿背', tongue: 'front-flat', category: '舌尖前音' },
  c: { lips: 'open-slight', airflow: 'strong', description: '舌尖抵住上齿背，气流强', tongue: 'front-flat', category: '舌尖前音' },
  s: { lips: 'open-slight', airflow: 'weak', description: '舌尖接近上齿背', tongue: 'front-flat', category: '舌尖前音' },
  // 舌尖中音 (alveolar)
  d: { lips: 'open', airflow: 'weak', description: '舌尖抵住上齿龈', tongue: 'tip-up', category: '舌尖中音' },
  t: { lips: 'open', airflow: 'strong', description: '舌尖抵住上齿龈，气流强', tongue: 'tip-up', category: '舌尖中音' },
  n: { lips: 'open', airflow: 'nose', description: '舌尖抵住上齿龈，鼻腔出气', tongue: 'tip-up', category: '舌尖中音' },
  l: { lips: 'open', airflow: 'sides', description: '舌尖抵住上齿龈，两边出气', tongue: 'tip-up', category: '舌尖中音' },
  // 舌尖后音 (retroflex)
  zh: { lips: 'open', airflow: 'weak', description: '舌尖翘起抵住硬腭', tongue: 'curled', category: '舌尖后音' },
  ch: { lips: 'open', airflow: 'strong', description: '舌尖翘起抵住硬腭，气流强', tongue: 'curled', category: '舌尖后音' },
  sh: { lips: 'open', airflow: 'weak', description: '舌尖翘起接近硬腭', tongue: 'curled', category: '舌尖后音' },
  r: { lips: 'open', airflow: 'weak', description: '舌尖翘起，声带振动', tongue: 'curled', category: '舌尖后音' },
  // 舌面音 (palatal)
  j: { lips: 'open-slight', airflow: 'weak', description: '舌面前部抵住硬腭', tongue: 'roof', category: '舌面音' },
  q: { lips: 'open-slight', airflow: 'strong', description: '舌面前部抵住硬腭，气流强', tongue: 'roof', category: '舌面音' },
  x: { lips: 'open-slight', airflow: 'weak', description: '舌面前部接近硬腭', tongue: 'roof', category: '舌面音' },
  // 舌根音 (velar)
  g: { lips: 'open', airflow: 'weak', description: '舌根抵住软腭', tongue: 'back', category: '舌根音' },
  k: { lips: 'open', airflow: 'strong', description: '舌根抵住软腭，气流强', tongue: 'back', category: '舌根音' },
  h: { lips: 'open', airflow: 'weak', description: '舌根接近软腭', tongue: 'back', category: '舌根音' },
}

function MouthDiagram({ initial, showLabel = true }) {
  const pos = mouthPositions[initial] || { lips: 'open', airflow: 'weak', description: '', tongue: 'none', category: '' }

  return (
    <div className={styles.container}>
      <svg viewBox="0 0 120 100" className={styles.svg}>
        {/* Face outline */}
        <ellipse cx="60" cy="45" rx="48" ry="42" fill="#ffeaa7" stroke="#fdcb6e" strokeWidth="1.5" />

        {/* Nose */}
        <path d="M 55 42 Q 60 48 65 42" fill="none" stroke="#e17055" strokeWidth="1.5" />

        {/* Eyes */}
        <ellipse cx="42" cy="32" rx="4" ry="5" fill="white" stroke="#2d3436" strokeWidth="1" />
        <circle cx="42" cy="33" r="2.5" fill="#2d3436" />
        <ellipse cx="78" cy="32" rx="4" ry="5" fill="white" stroke="#2d3436" strokeWidth="1" />
        <circle cx="78" cy="33" r="2.5" fill="#2d3436" />

        {/* Teeth row for open mouths */}
        {(pos.lips === 'open' || pos.lips === 'open-slight') && (
          <g className={styles.teeth}>
            <rect x="45" y="56" width="30" height="6" rx="1" fill="white" stroke="#dfe6e9" strokeWidth="0.8" />
            {/* Individual teeth lines */}
            <line x1="50" y1="56" x2="50" y2="62" stroke="#dfe6e9" strokeWidth="0.5" />
            <line x1="55" y1="56" x2="55" y2="62" stroke="#dfe6e9" strokeWidth="0.5" />
            <line x1="60" y1="56" x2="60" y2="62" stroke="#dfe6e9" strokeWidth="0.5" />
            <line x1="65" y1="56" x2="65" y2="62" stroke="#dfe6e9" strokeWidth="0.5" />
            <line x1="70" y1="56" x2="70" y2="62" stroke="#dfe6e9" strokeWidth="0.5" />
          </g>
        )}

        {/* Tongue visualization based on type */}
        {pos.tongue !== 'none' && (
          <g className={styles.tongue}>
            {pos.tongue === 'front-flat' && (
              <>
                {/* 舌尖前音: tongue flat against teeth */}
                <path d="M 38 64 Q 60 60 82 64" fill="#ff7675" stroke="#d63031" strokeWidth="1" />
                <path d="M 42 63 Q 60 62 78 63" fill="#fab1a0" stroke="none" />
                <text x="60" y="76" textAnchor="middle" fontSize="5" fill="#636e72" fontWeight="bold">舌尖前</text>
              </>
            )}
            {pos.tongue === 'tip-up' && (
              <>
                {/* 舌尖中音: tongue tip touching alveolar ridge */}
                <path d="M 38 66 Q 52 52 60 50 Q 68 52 82 66" fill="#ff7675" stroke="#d63031" strokeWidth="1" />
                <path d="M 42 64 Q 55 55 60 53 Q 65 55 78 64" fill="#fab1a0" stroke="none" />
                {/* Arrow showing contact point */}
                <path d="M 60 48 L 60 52" stroke="#d63031" strokeWidth="1.5" markerEnd="url(#contactDot)" />
                <text x="60" y="76" textAnchor="middle" fontSize="5" fill="#636e72" fontWeight="bold">舌尖中</text>
              </>
            )}
            {pos.tongue === 'curled' && (
              <>
                {/* 舌尖后音: tongue curled up */}
                <path d="M 38 68 Q 48 60 55 52 Q 60 48 65 50 Q 72 54 82 60 Q 85 64 82 68" fill="#ff7675" stroke="#d63031" strokeWidth="1" />
                <path d="M 42 66 Q 50 60 56 54 Q 60 50 64 52 Q 70 56 78 62" fill="#fab1a0" stroke="none" />
                {/* Curled tip indicator */}
                <path d="M 60 46 Q 62 44 64 46" fill="none" stroke="#d63031" strokeWidth="1" />
                <text x="60" y="78" textAnchor="middle" fontSize="5" fill="#636e72" fontWeight="bold">舌尖后</text>
              </>
            )}
            {pos.tongue === 'roof' && (
              <>
                {/* 舌面音: tongue touching roof */}
                <path d="M 38 68 Q 50 50 60 42 Q 70 50 82 68" fill="#ff7675" stroke="#d63031" strokeWidth="1" />
                <path d="M 42 66 Q 52 52 60 45 Q 68 52 78 66" fill="#fab1a0" stroke="none" />
                {/* Contact zone indicator */}
                <ellipse cx="60" cy="44" rx="8" ry="3" fill="none" stroke="#d63031" strokeWidth="1" strokeDasharray="2,1" />
                <text x="60" y="78" textAnchor="middle" fontSize="5" fill="#636e72" fontWeight="bold">舌面</text>
              </>
            )}
            {pos.tongue === 'back' && (
              <>
                {/* 舌根音: tongue back raised */}
                <path d="M 38 70 Q 45 68 52 62 Q 58 58 62 60 Q 68 64 75 68 Q 80 70 82 70" fill="#ff7675" stroke="#d63031" strokeWidth="1" />
                <path d="M 42 68 Q 48 66 54 62 Q 58 60 62 62 Q 68 66 76 68" fill="#fab1a0" stroke="none" />
                {/* Back raised indicator */}
                <path d="M 62 58 L 62 62" stroke="#d63031" strokeWidth="1.5" />
                <text x="60" y="78" textAnchor="middle" fontSize="5" fill="#636e72" fontWeight="bold">舌根</text>
              </>
            )}
          </g>
        )}

        {/* Mouth based on position */}
        {pos.lips === 'closed' && (
          <>
            <line x1="42" y1="62" x2="78" y2="62" stroke="#d63031" strokeWidth="3" strokeLinecap="round" />
            {/* Lip crease details */}
            <path d="M 45 62 Q 60 65 75 62" fill="none" stroke="#e17055" strokeWidth="0.8" />
          </>
        )}

        {pos.lips === 'teeth-lip' && (
          <>
            {/* Upper lip */}
            <path d="M 42 58 Q 60 56 78 58" fill="#ff7675" stroke="#d63031" strokeWidth="1" />
            {/* Lower lip pulled down */}
            <path d="M 42 64 Q 60 70 78 64" fill="#ff7675" stroke="#d63031" strokeWidth="1" />
            {/* Teeth showing */}
            <rect x="48" y="58" width="24" height="6" rx="1" fill="white" stroke="#dfe6e9" strokeWidth="0.8" />
            <line x1="54" y1="58" x2="54" y2="64" stroke="#dfe6e9" strokeWidth="0.5" />
            <line x1="60" y1="58" x2="60" y2="64" stroke="#dfe6e9" strokeWidth="0.5" />
            <line x1="66" y1="58" x2="66" y2="64" stroke="#dfe6e9" strokeWidth="0.5" />
            {/* Lower teeth */}
            <rect x="48" y="64" width="24" height="4" rx="1" fill="white" stroke="#dfe6e9" strokeWidth="0.5" opacity="0.7" />
          </>
        )}

        {pos.lips === 'open' && (
          <>
            {/* Upper lip */}
            <path d="M 42 58 Q 50 55 60 57 Q 70 55 78 58" fill="#ff7675" stroke="#d63031" strokeWidth="1.5" />
            {/* Lower lip */}
            <path d="M 42 68 Q 60 76 78 68" fill="#ff7675" stroke="#d63031" strokeWidth="1.5" />
            {/* Mouth opening */}
            <path d="M 45 62 Q 60 72 75 62" fill="#d63031" stroke="none" />
            {/* Lip crease */}
            <path d="M 45 62 Q 60 65 75 62" fill="none" stroke="#c0392b" strokeWidth="0.8" />
          </>
        )}

        {pos.lips === 'open-slight' && (
          <>
            {/* Upper lip */}
            <path d="M 44 60 Q 52 58 60 59 Q 68 58 76 60" fill="#ff7675" stroke="#d63031" strokeWidth="1.5" />
            {/* Lower lip */}
            <path d="M 44 66 Q 60 72 76 66" fill="#ff7675" stroke="#d63031" strokeWidth="1.5" />
            {/* Slight mouth opening */}
            <path d="M 46 63 Q 60 68 74 63" fill="#d63031" stroke="none" />
            {/* Lip crease */}
            <path d="M 46 63 Q 60 65 74 63" fill="none" stroke="#c0392b" strokeWidth="0.6" />
          </>
        )}

        {/* Airflow indicator */}
        {pos.airflow === 'strong' && (
          <g className={styles.airflow}>
            <path d="M 60 76 L 60 90" stroke="#0984e3" strokeWidth="2" markerEnd="url(#arrow)" />
            <path d="M 55 80 L 60 90 L 65 80" fill="none" stroke="#0984e3" strokeWidth="1.5" />
          </g>
        )}
        {pos.airflow === 'nose' && (
          <g className={styles.airflow}>
            <path d="M 60 40 L 60 22" stroke="#00b894" strokeWidth="2" markerEnd="url(#arrowNose)" />
            <circle cx="60" cy="20" r="3" fill="#00b894" opacity="0.3" />
          </g>
        )}
        {pos.airflow === 'sides' && (
          <g className={styles.airflow}>
            <path d="M 42 68 L 28 75" stroke="#fdcb6e" strokeWidth="2" markerEnd="url(#arrowSideLeft)" />
            <path d="M 78 68 L 92 75" stroke="#fdcb6e" strokeWidth="2" markerEnd="url(#arrowSideRight)" />
            <circle cx="25" cy="77" r="2" fill="#fdcb6e" opacity="0.3" />
            <circle cx="95" cy="77" r="2" fill="#fdcb6e" opacity="0.3" />
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
          <marker id="contactDot" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <circle cx="3" cy="3" r="2" fill="#d63031" />
          </marker>
        </defs>
      </svg>

      {showLabel && (
        <div className={styles.label}>
          {pos.category && <span className={styles.categoryBadge}>{pos.category}</span>}
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
