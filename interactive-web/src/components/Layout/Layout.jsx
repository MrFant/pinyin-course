import { Link, useLocation } from 'react-router-dom'
import styles from './Layout.module.css'

function Layout({ children }) {
  const location = useLocation()

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>📚</span>
          <span className={styles.logoText}>拼音打字课</span>
        </Link>
        <nav className={styles.nav}>
          <Link
            to="/"
            className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
          >
            首页
          </Link>
          <Link
            to="/practice/initials"
            className={`${styles.navLink} ${location.pathname.includes('/practice') ? styles.active : ''}`}
          >
            练习
          </Link>
        </nav>
      </header>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}

export default Layout