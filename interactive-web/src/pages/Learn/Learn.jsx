import { useParams, useNavigate, Link } from 'react-router-dom'
import { getChapterContent } from '../../data/courseContent'
import Button from '../../components/Button/Button'
import MarkdownRenderer from '../../components/MarkdownRenderer/MarkdownRenderer'
import MouthDiagram from '../../components/MouthDiagram/MouthDiagram'
import ToneAnimation from '../../components/ToneAnimation/ToneAnimation'
import FinalDiagram from '../../components/FinalDiagram/FinalDiagram'
import SpellingDiagram from '../../components/SpellingDiagram/SpellingDiagram'
import SyllableGrid from '../../components/SyllableGrid/SyllableGrid'
import styles from './Learn.module.css'

function Learn() {
  const { chapterId } = useParams()
  const navigate = useNavigate()
  const chapter = getChapterContent(chapterId)

  if (!chapter) {
    return (
      <div className={styles.container}>
        <h2>章节不存在</h2>
        <Button onClick={() => navigate('/')}>返回首页</Button>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate('/')}>
          ← 返回首页
        </button>
        <h1 className={styles.title}>{chapter.icon} {chapter.title}</h1>
        <p className={styles.description}>{chapter.description}</p>
      </div>

      <div className={styles.content}>
        {chapter.sections.map((section, index) => (
          <div key={index} className={styles.section}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            <div className={styles.sectionContent}>
              <MarkdownRenderer content={section.content} />
            </div>
            {section.visualType === 'mouthDiagram' && section.visualData && (
              <div className={styles.visualRow}>
                {section.visualData.map((initial) => (
                  <MouthDiagram key={initial} initial={initial} />
                ))}
              </div>
            )}
            {section.visualType === 'toneAnimation' && section.visualData && (
              <div className={styles.visualRow}>
                {section.visualData.map((tone) => (
                  <ToneAnimation key={tone} tone={tone} />
                ))}
              </div>
            )}
            {section.visualType === 'finalDiagram' && section.visualData && (
              <div className={styles.visualRow}>
                {section.visualData.map((final) => (
                  <FinalDiagram key={final} final={final} />
                ))}
              </div>
            )}
            {section.visualType === 'spellingDiagram' && section.visualData && (
              <div className={styles.visualRow}>
                <SpellingDiagram
                  initial={section.visualData.initial}
                  final={section.visualData.final}
                />
              </div>
            )}
            {section.visualType === 'spellingDiagramGroup' && section.visualData && (
              <div className={styles.visualRow}>
                {section.visualData.map((item, idx) => (
                  <SpellingDiagram
                    key={idx}
                    initial={item.initial}
                    final={item.final}
                  />
                ))}
              </div>
            )}
            {section.visualType === 'syllableGrid' && (
              <div className={styles.visualRow}>
                <SyllableGrid />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <Button onClick={() => navigate(`/practice/${chapterId}`)}>
          🎯 开始练习
        </Button>
        <Button variant="secondary" onClick={() => navigate('/')}>
          返回首页
        </Button>
      </div>
    </div>
  )
}

export default Learn
