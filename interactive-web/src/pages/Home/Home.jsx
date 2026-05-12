import { Link } from 'react-router-dom'
import { chapters } from '../../data/chapters'
import useProgressStore from '../../store/progressStore'
import Progress from '../../components/Progress/Progress'
import styles from './Home.module.css'

function Home() {
  const getChapterStats = useProgressStore(state => state.getChapterStats)

  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        <h1 className={styles.title}>欢迎来到拼音打字课！</h1>
        <p className={styles.subtitle}>系统学习汉语拼音，轻松掌握打字技能</p>
      </div>

      <div className={styles.chapters}>
        <h2 className={styles.sectionTitle}>选择章节开始学习</h2>
        <div className={styles.chapterGrid}>
          {chapters.map(chapter => {
            const stats = getChapterStats(chapter.id, chapter.cards.length)
            return (
              <div key={chapter.id} className={styles.chapterCard}>
                <div className={styles.chapterIcon}>{chapter.icon}</div>
                <div className={styles.chapterInfo}>
                  <h3 className={styles.chapterName}>{chapter.name}</h3>
                  <p className={styles.chapterDesc}>{chapter.description}</p>
                  <Progress current={stats.completed} total={stats.total} showLabel={false} />
                  <div className={styles.chapterStats}>
                    {stats.completed > 0 ? (
                      <span>已完成 {stats.completed}/{stats.total} · 正确率 {stats.accuracy}%</span>
                    ) : (
                      <span>{chapter.cards.length} 张卡片</span>
                    )}
                  </div>
                  <div className={styles.chapterActions}>
                    <Link to={`/learn/${chapter.id}`} className={styles.learnBtn}>
                      📚 学习课程
                    </Link>
                    <Link to={`/practice/${chapter.id}`} className={styles.practiceBtn}>
                      🎯 开始练习
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Home
