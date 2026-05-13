import { memo } from 'react'
import styles from './SyllableGrid.module.css'

const syllables = [
  { pinyin: 'zhi', char: '知', group: 'zh/ch/sh/r + i' },
  { pinyin: 'chi', char: '吃', group: 'zh/ch/sh/r + i' },
  { pinyin: 'shi', char: '诗', group: 'zh/ch/sh/r + i' },
  { pinyin: 'ri', char: '日', group: 'zh/ch/sh/r + i' },
  { pinyin: 'zi', char: '资', group: 'z/c/s + i' },
  { pinyin: 'ci', char: '此', group: 'z/c/s + i' },
  { pinyin: 'si', char: '思', group: 'z/c/s + i' },
  { pinyin: 'yi', char: '一', group: 'y/w 开头' },
  { pinyin: 'wu', char: '五', group: 'y/w 开头' },
  { pinyin: 'yu', char: '鱼', group: 'y/w 开头' },
  { pinyin: 'ye', char: '也', group: '复韵母' },
  { pinyin: 'yue', char: '月', group: '复韵母' },
  { pinyin: 'yuan', char: '元', group: '复韵母' },
  { pinyin: 'yin', char: '因', group: '鼻韵母' },
  { pinyin: 'yun', char: '云', group: '鼻韵母' },
  { pinyin: 'ying', char: '英', group: '鼻韵母' },
]

const groupColors = {
  'zh/ch/sh/r + i': '#e17055',
  'z/c/s + i': '#00b894',
  'y/w 开头': '#0984e3',
  '复韵母': '#6c5ce7',
  '鼻韵母': '#fdcb6e',
}

function SyllableGrid({ showGroupColors = true }) {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {syllables.map((item) => (
          <div
            key={item.pinyin}
            className={styles.card}
            style={{
              borderColor: showGroupColors ? groupColors[item.group] : '#ddd'
            }}
          >
            <span className={styles.pinyin}>{item.pinyin}</span>
            <span className={styles.char}>{item.char}</span>
            {showGroupColors && (
              <span
                className={styles.groupBadge}
                style={{ background: groupColors[item.group] }}
              >
                {item.group}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(SyllableGrid)
