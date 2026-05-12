import { useParams, useNavigate, Link } from 'react-router-dom'
import { getChapterContent } from '../../data/courseContent'
import Button from '../../components/Button/Button'
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
              {section.content.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
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
