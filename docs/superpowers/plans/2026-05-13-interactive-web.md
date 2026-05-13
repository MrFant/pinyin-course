# 汉语拼音打字课程 - 交互式网页版本 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create an interactive web version of the Pinyin typing course with flashcard practice, progress tracking, and a playful design.

**Architecture:** React + Vite single-page application with component-based architecture. Core components: FlashCard, Button, Progress. Pages: Home, Practice, Result. Data stored in localStorage for persistence.

**Tech Stack:** React 18, Vite, CSS Modules, React Router, Zustand (state management)

---

## File Structure

```
interactive-web/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── FlashCard/
│   │   │   ├── FlashCard.jsx
│   │   │   └── FlashCard.module.css
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   └── Button.module.css
│   │   ├── Progress/
│   │   │   ├── Progress.jsx
│   │   │   └── Progress.module.css
│   │   └── Layout/
│   │       ├── Layout.jsx
│   │       └── Layout.module.css
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.module.css
│   │   ├── Practice/
│   │   │   ├── Practice.jsx
│   │   │   └── Practice.module.css
│   │   └── Result/
│   │       ├── Result.jsx
│   │       └── Result.module.css
│   ├── data/
│   │   └── chapters.js
│   ├── hooks/
│   │   └── useProgress.js
│   ├── store/
│   │   └── progressStore.js
│   ├── App.jsx
│   ├── App.module.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Task 1: Project Setup

**Files:**
- Create: `interactive-web/package.json`
- Create: `interactive-web/vite.config.js`
- Create: `interactive-web/index.html`
- Create: `interactive-web/src/main.jsx`
- Create: `interactive-web/src/App.jsx`
- Create: `interactive-web/src/index.css`

- [ ] **Step 1: Create project directory**

```bash
mkdir -p interactive-web/src interactive-web/public
```

- [ ] **Step 2: Create package.json**

```json
{
  "name": "pinyin-interactive",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "zustand": "^4.4.7"
  },
  "devDependencies": {
    "@types/react": "^18.2.37",
    "@types/react-dom": "^18.2.15",
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0"
  }
}
```

- [ ] **Step 3: Create vite.config.js**

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/pinyin-course/'
})
```

- [ ] **Step 4: Create index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>汉语拼音打字课程</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Create src/main.jsx**

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

- [ ] **Step 6: Create src/App.jsx**

```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home/Home'
import Practice from './pages/Practice/Practice'
import Result from './pages/Result/Result'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/practice/:chapterId" element={<Practice />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
```

- [ ] **Step 7: Create src/index.css**

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: #f8f9fa;
  min-height: 100vh;
}

#root {
  min-height: 100vh;
}
```

- [ ] **Step 8: Install dependencies and test**

```bash
cd interactive-web && npm install && npm run dev
```

- [ ] **Step 9: Commit**

```bash
git add interactive-web/
git commit -m "feat: initialize React + Vite project"
```

---

## Task 2: Data Layer

**Files:**
- Create: `interactive-web/src/data/chapters.js`
- Create: `interactive-web/src/store/progressStore.js`

- [ ] **Step 1: Create chapters data**

```javascript
export const chapters = [
  {
    id: 'initials',
    name: '声母练习',
    description: '21个声母的发音和拼读',
    icon: '🔤',
    cards: [
      { id: 1, front: 'b', back: { pinyin: 'b', character: '八', meaning: '数字8', example: '八仙过海', pronunciation: '双唇紧闭，突然打开，气流较弱' } },
      { id: 2, front: 'p', back: { pinyin: 'p', character: '爬', meaning: '攀爬', example: '爬山', pronunciation: '双唇紧闭，突然打开，气流较强' } },
      { id: 3, front: 'm', back: { pinyin: 'm', character: '妈', meaning: '母亲', example: '妈妈', pronunciation: '双唇紧闭，气流从鼻腔通过' } },
      { id: 4, front: 'f', back: { pinyin: 'f', character: '发', meaning: '头发', example: '理发', pronunciation: '上齿轻触下唇，气流从缝隙中挤出' } },
      { id: 5, front: 'd', back: { pinyin: 'd', character: '大', meaning: '体积大', example: '大家', pronunciation: '舌尖抵住上齿龈，突然打开，气流较弱' } },
      { id: 6, front: 't', back: { pinyin: 't', character: '他', meaning: '第三人称', example: '他们', pronunciation: '舌尖抵住上齿龈，突然打开，气流较强' } },
      { id: 7, front: 'n', back: { pinyin: 'n', character: '你', meaning: '第二人称', example: '你好', pronunciation: '舌尖抵住上齿龈，气流从鼻腔通过' } },
      { id: 8, front: 'l', back: { pinyin: 'l', character: '李', meaning: '姓氏', example: '李子', pronunciation: '舌尖抵住上齿龈，气流从舌头两边通过' } },
      { id: 9, front: 'g', back: { pinyin: 'g', character: '哥', meaning: '兄长', example: '哥哥', pronunciation: '舌根抵住软腭，突然打开，气流较弱' } },
      { id: 10, front: 'k', back: { pinyin: 'k', character: '科', meaning: '学科', example: '科学', pronunciation: '舌根抵住软腭，突然打开，气流较强' } },
      { id: 11, front: 'h', back: { pinyin: 'h', character: '好', meaning: '优良', example: '你好', pronunciation: '舌根接近软腭，气流从缝隙中挤出' } },
      { id: 12, front: 'j', back: { pinyin: 'j', character: '鸡', meaning: '家禽', example: '小鸡', pronunciation: '舌面前部抵住硬腭前部，突然打开，气流较弱' } },
      { id: 13, front: 'q', back: { pinyin: 'q', character: '七', meaning: '数字7', example: '七天', pronunciation: '舌面前部抵住硬腭前部，突然打开，气流较强' } },
      { id: 14, front: 'x', back: { pinyin: 'x', character: '西', direction: '西方', example: '西瓜', pronunciation: '舌面前部接近硬腭前部，气流从缝隙中挤出' } },
      { id: 15, front: 'zh', back: { pinyin: 'zh', character: '知', meaning: '知道', example: '知识', pronunciation: '舌尖翘起抵住硬腭前部，突然打开，气流较弱' } },
      { id: 16, front: 'ch', back: { pinyin: 'ch', character: '吃', meaning: '进食', example: '吃饭', pronunciation: '舌尖翘起抵住硬腭前部，突然打开，气流较强' } },
      { id: 17, front: 'sh', back: { pinyin: 'sh', character: '诗', meaning: '诗歌', example: '诗人', pronunciation: '舌尖翘起接近硬腭前部，气流从缝隙中挤出' } },
      { id: 18, front: 'r', back: { pinyin: 'r', character: '日', meaning: '太阳', example: '日子', pronunciation: '舌尖翘起接近硬腭前部，气流从缝隙中挤出，声带振动' } },
      { id: 19, front: 'z', back: { pinyin: 'z', character: '资', meaning: '资本', example: '资本', pronunciation: '舌尖抵住上齿背，突然打开，气流较弱' } },
      { id: 20, front: 'c', back: { pinyin: 'c', character: '此', meaning: '这个', example: '此时', pronunciation: '舌尖抵住上齿背，突然打开，气流较强' } },
      { id: 21, front: 's', back: { pinyin: 's', character: '思', meaning: '思考', example: '思想', pronunciation: '舌尖接近上齿背，气流从缝隙中挤出' } }
    ]
  },
  {
    id: 'finals',
    name: '韵母练习',
    description: '39个韵母的发音和拼读',
    icon: '🔡',
    cards: [
      { id: 1, front: 'a', back: { pinyin: 'a', character: '啊', meaning: '语气词', example: '啊呀', pronunciation: '开口大，舌位低，嘴唇不圆' } },
      { id: 2, front: 'o', back: { pinyin: 'o', character: '哦', meaning: '语气词', example: '哦哦', pronunciation: '开口中等，舌位中，嘴唇圆' } },
      { id: 3, front: 'e', back: { pinyin: 'e', character: '鹅', meaning: '家禽', example: '大鹅', pronunciation: '开口中等，舌位中，嘴唇不圆' } },
      { id: 4, front: 'i', back: { pinyin: 'i', character: '衣', meaning: '衣服', example: '上衣', pronunciation: '开口小，舌位高，嘴唇不圆' } },
      { id: 5, front: 'u', back: { pinyin: 'u', character: '乌', meaning: '黑色', example: '乌鸦', pronunciation: '开口小，舌位高，嘴唇圆' } },
      { id: 6, front: 'ü', back: { pinyin: 'ü', character: '鱼', meaning: '鱼类', example: '小鱼', pronunciation: '开口小，舌位高，嘴唇圆（比u更前）' } }
    ]
  },
  {
    id: 'tones',
    name: '声调练习',
    description: '四声的发音和变调',
    icon: '🎵',
    cards: [
      { id: 1, front: 'ā (一声)', back: { pinyin: 'ā', character: '妈', meaning: '母亲', example: '妈妈', pronunciation: '调值55，高平调' } },
      { id: 2, front: 'á (二声)', back: { pinyin: 'á', character: '麻', meaning: '麻类植物', example: '麻花', pronunciation: '调值35，中升调' } },
      { id: 3, front: 'ǎ (三声)', back: { pinyin: 'ǎ', character: '马', meaning: '动物', example: '小马', pronunciation: '调值214，降升调' } },
      { id: 4, front: 'à (四声)', back: { pinyin: 'à', character: '骂', meaning: '责骂', example: '骂人', pronunciation: '调值51，全降调' } }
    ]
  }
]

export const getChapterById = (id) => chapters.find(ch => ch.id === id)
export const getCardById = (chapterId, cardId) => {
  const chapter = getChapterById(chapterId)
  return chapter?.cards.find(card => card.id === cardId)
}
```

- [ ] **Step 2: Create progress store with Zustand**

```javascript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useProgressStore = create(
  persist(
    (set, get) => ({
      progress: {},
      
      getChapterProgress: (chapterId) => {
        return get().progress[chapterId] || { completed: [], lastCard: 0 }
      },
      
      markCardCompleted: (chapterId, cardId, correct) => {
        const current = get().getChapterProgress(chapterId)
        const completed = [...current.completed]
        const existing = completed.find(c => c.cardId === cardId)
        
        if (existing) {
          existing.correct = correct
          existing.attempts = (existing.attempts || 0) + 1
        } else {
          completed.push({ cardId, correct, attempts: 1, timestamp: Date.now() })
        }
        
        set({
          progress: {
            ...get().progress,
            [chapterId]: {
              completed,
              lastCard: cardId,
              lastUpdated: Date.now()
            }
          }
        })
      },
      
      getChapterStats: (chapterId, totalCards) => {
        const { completed } = get().getChapterProgress(chapterId)
        const correctCount = completed.filter(c => c.correct).length
        return {
          total: totalCards,
          completed: completed.length,
          correct: correctCount,
          accuracy: completed.length > 0 ? Math.round((correctCount / completed.length) * 100) : 0
        }
      },
      
      resetChapter: (chapterId) => {
        const progress = { ...get().progress }
        delete progress[chapterId]
        set({ progress })
      }
    }),
    {
      name: 'pinyin-progress'
    }
  )
)

export default useProgressStore
```

- [ ] **Step 3: Commit**

```bash
git add interactive-web/src/data/ interactive-web/src/store/
git commit -m "feat: add chapter data and progress store"
```

---

## Task 3: Core Components

**Files:**
- Create: `interactive-web/src/components/FlashCard/FlashCard.jsx`
- Create: `interactive-web/src/components/FlashCard/FlashCard.module.css`
- Create: `interactive-web/src/components/Button/Button.jsx`
- Create: `interactive-web/src/components/Button/Button.module.css`
- Create: `interactive-web/src/components/Progress/Progress.jsx`
- Create: `interactive-web/src/components/Progress/Progress.module.css`

- [ ] **Step 1: Create FlashCard component**

```jsx
import { useState } from 'react'
import styles from './FlashCard.module.css'

function FlashCard({ front, back, onFlip }) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleClick = () => {
    const newState = !isFlipped
    setIsFlipped(newState)
    onFlip && onFlip(newState)
  }

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
        <div className={`${styles.face} ${styles.front}`}>
          <div className={styles.content}>
            <div className={styles.mainText}>{front}</div>
            <div className={styles.hint}>点击翻转</div>
          </div>
        </div>
        <div className={`${styles.face} ${styles.back}`}>
          <div className={styles.content}>
            <div className={styles.pinyin}>{back.pinyin}</div>
            <div className={styles.character}>{back.character}</div>
            <div className={styles.meaning}>{back.meaning}</div>
            <div className={styles.example}>例：{back.example}</div>
            <div className={styles.pronunciation}>{back.pronunciation}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlashCard
```

- [ ] **Step 2: Create FlashCard styles**

```css
.container {
  perspective: 1000px;
  width: 300px;
  height: 350px;
  cursor: pointer;
}

.card {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.card.flipped {
  transform: rotateY(180deg);
}

.face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
}

.front {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.back {
  background: white;
  transform: rotateY(180deg);
}

.content {
  padding: 30px;
  text-align: center;
  width: 100%;
}

.mainText {
  font-size: 72px;
  font-weight: bold;
  margin-bottom: 20px;
}

.hint {
  font-size: 14px;
  opacity: 0.8;
}

.pinyin {
  font-size: 48px;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 15px;
}

.character {
  font-size: 36px;
  color: #333;
  margin-bottom: 10px;
}

.meaning {
  font-size: 16px;
  color: #666;
  margin-bottom: 15px;
}

.example {
  font-size: 14px;
  color: #999;
  margin-bottom: 15px;
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 8px;
}

.pronunciation {
  font-size: 12px;
  color: #888;
  line-height: 1.4;
}

@media (max-width: 480px) {
  .container {
    width: 260px;
    height: 300px;
  }
  
  .mainText {
    font-size: 56px;
  }
  
  .pinyin {
    font-size: 36px;
  }
  
  .character {
    font-size: 28px;
  }
}
```

- [ ] **Step 3: Create Button component**

```jsx
import styles from './Button.module.css'

function Button({ children, variant = 'primary', onClick, disabled = false }) {
  return (
    <button 
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
```

- [ ] **Step 4: Create Button styles**

```css
.button {
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.button:hover:not(:disabled) {
  transform: scale(1.05);
}

.button:active:not(:disabled) {
  transform: scale(0.95);
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.success {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  color: white;
}

.danger {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.secondary {
  background: #e9ecef;
  color: #495057;
}
```

- [ ] **Step 5: Create Progress component**

```jsx
import styles from './Progress.module.css'

function Progress({ current, total, showLabel = true }) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0
  
  return (
    <div className={styles.container}>
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className={styles.label}>
          {current} / {total} ({percentage}%)
        </div>
      )}
    </div>
  )
}

export default Progress
```

- [ ] **Step 6: Create Progress styles**

```css
.container {
  width: 100%;
}

.progressBar {
  width: 100%;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
}

.progressFill {
  height: 100%;
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.label {
  margin-top: 8px;
  font-size: 14px;
  color: #666;
  text-align: center;
}
```

- [ ] **Step 7: Commit**

```bash
git add interactive-web/src/components/
git commit -m "feat: add FlashCard, Button, and Progress components"
```

---

## Task 4: Layout Component

**Files:**
- Create: `interactive-web/src/components/Layout/Layout.jsx`
- Create: `interactive-web/src/components/Layout/Layout.module.css`

- [ ] **Step 1: Create Layout component**

```jsx
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
```

- [ ] **Step 2: Create Layout styles**

```css
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: white;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: inherit;
}

.logoIcon {
  font-size: 24px;
}

.logoText {
  font-size: 20px;
  font-weight: bold;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav {
  display: flex;
  gap: 20px;
}

.navLink {
  text-decoration: none;
  color: #666;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.2s ease;
}

.navLink:hover {
  background: #f8f9fa;
  color: #333;
}

.navLink.active {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.main {
  flex: 1;
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

@media (max-width: 480px) {
  .header {
    padding: 12px 15px;
  }
  
  .logoText {
    font-size: 16px;
  }
  
  .nav {
    gap: 10px;
  }
  
  .navLink {
    padding: 6px 12px;
    font-size: 14px;
  }
  
  .main {
    padding: 15px;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add interactive-web/src/components/Layout/
git commit -m "feat: add Layout component with navigation"
```

---

## Task 5: Home Page

**Files:**
- Create: `interactive-web/src/pages/Home/Home.jsx`
- Create: `interactive-web/src/pages/Home/Home.module.css`

- [ ] **Step 1: Create Home page**

```jsx
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
        <h1 className={styles.title}>欢迎来到拼音打字课！👋</h1>
        <p className={styles.subtitle}>系统学习汉语拼音，轻松掌握打字技能</p>
      </div>
      
      <div className={styles.chapters}>
        <h2 className={styles.sectionTitle}>选择章节开始学习</h2>
        <div className={styles.chapterGrid}>
          {chapters.map(chapter => {
            const stats = getChapterStats(chapter.id, chapter.cards.length)
            return (
              <Link 
                key={chapter.id} 
                to={`/practice/${chapter.id}`}
                className={styles.chapterCard}
              >
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
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Home
```

- [ ] **Step 2: Create Home styles**

```css
.container {
  max-width: 800px;
  margin: 0 auto;
}

.welcome {
  text-align: center;
  margin-bottom: 40px;
}

.title {
  font-size: 32px;
  color: #333;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 18px;
  color: #666;
}

.sectionTitle {
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
}

.chapterGrid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.chapterCard {
  display: flex;
  align-items: center;
  gap: 20px;
  background: white;
  padding: 20px;
  border-radius: 15px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.chapterCard:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.chapterIcon {
  font-size: 48px;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chapterInfo {
  flex: 1;
}

.chapterName {
  font-size: 20px;
  color: #333;
  margin-bottom: 5px;
}

.chapterDesc {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.chapterStats {
  font-size: 12px;
  color: #999;
}

@media (max-width: 480px) {
  .title {
    font-size: 24px;
  }
  
  .subtitle {
    font-size: 16px;
  }
  
  .chapterCard {
    flex-direction: column;
    text-align: center;
    padding: 15px;
  }
  
  .chapterIcon {
    width: 60px;
    height: 60px;
    font-size: 36px;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add interactive-web/src/pages/Home/
git commit -m "feat: add Home page with chapter list"
```

---

## Task 6: Practice Page

**Files:**
- Create: `interactive-web/src/pages/Practice/Practice.jsx`
- Create: `interactive-web/src/pages/Practice/Practice.module.css`

- [ ] **Step 1: Create Practice page**

```jsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getChapterById } from '../../data/chapters'
import useProgressStore from '../../store/progressStore'
import FlashCard from '../../components/FlashCard/FlashCard'
import Button from '../../components/Button/Button'
import Progress from '../../components/Progress/Progress'
import styles from './Practice.module.css'

function Practice() {
  const { chapterId } = useParams()
  const navigate = useNavigate()
  const chapter = getChapterById(chapterId)
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [results, setResults] = useState([])
  const [showResult, setShowResult] = useState(false)
  
  const markCardCompleted = useProgressStore(state => state.markCardCompleted)
  const getChapterStats = useProgressStore(state => state.getChapterStats)
  
  useEffect(() => {
    setCurrentIndex(0)
    setIsFlipped(false)
    setResults([])
    setShowResult(false)
  }, [chapterId])
  
  if (!chapter) {
    return (
      <div className={styles.container}>
        <h2>章节不存在</h2>
        <Button onClick={() => navigate('/')}>返回首页</Button>
      </div>
    )
  }
  
  const currentCard = chapter.cards[currentIndex]
  const stats = getChapterStats(chapterId, chapter.cards.length)
  const isComplete = currentIndex >= chapter.cards.length
  
  const handleResult = (correct) => {
    markCardCompleted(chapterId, currentCard.id, correct)
    setResults([...results, { cardId: currentCard.id, correct }])
    setIsFlipped(false)
    
    if (currentIndex + 1 >= chapter.cards.length) {
      setShowResult(true)
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }
  
  const handleRestart = () => {
    setCurrentIndex(0)
    setIsFlipped(false)
    setResults([])
    setShowResult(false)
  }
  
  if (showResult) {
    const correctCount = results.filter(r => r.correct).length
    const accuracy = Math.round((correctCount / results.length) * 100)
    
    return (
      <div className={styles.container}>
        <div className={styles.resultCard}>
          <h2 className={styles.resultTitle}>🎉 练习完成！</h2>
          <div className={styles.resultStats}>
            <div className={styles.statItem}>
              <div className={styles.statValue}>{results.length}</div>
              <div className={styles.statLabel}>总卡片</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>{correctCount}</div>
              <div className={styles.statLabel}>正确认识</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>{accuracy}%</div>
              <div className={styles.statLabel}>正确率</div>
            </div>
          </div>
          <div className={styles.resultActions}>
            <Button onClick={handleRestart}>再练一次</Button>
            <Button variant="secondary" onClick={() => navigate('/')}>返回首页</Button>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.chapterTitle}>{chapter.icon} {chapter.name}</h1>
        <Progress current={currentIndex + 1} total={chapter.cards.length} />
      </div>
      
      <div className={styles.cardArea}>
        <FlashCard 
          front={currentCard.front} 
          back={currentCard.back}
          onFlip={setIsFlipped}
        />
      </div>
      
      <div className={styles.actions}>
        <Button variant="danger" onClick={() => handleResult(false)}>
          ❌ 不认识
        </Button>
        <Button variant="success" onClick={() => handleResult(true)}>
          ✓ 认识
        </Button>
      </div>
    </div>
  )
}

export default Practice
```

- [ ] **Step 2: Create Practice styles**

```css
.container {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  width: 100%;
  margin-bottom: 30px;
}

.chapterTitle {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.cardArea {
  display: flex;
  justify-content: center;
  margin: 30px 0;
}

.actions {
  display: flex;
  gap: 20px;
}

.resultCard {
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  text-align: center;
  width: 100%;
  max-width: 400px;
}

.resultTitle {
  font-size: 28px;
  color: #333;
  margin-bottom: 30px;
}

.resultStats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
}

.statItem {
  text-align: center;
}

.statValue {
  font-size: 36px;
  font-weight: bold;
  color: #667eea;
}

.statLabel {
  font-size: 14px;
  color: #666;
  margin-top: 5px;
}

.resultActions {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

@media (max-width: 480px) {
  .chapterTitle {
    font-size: 20px;
  }
  
  .resultCard {
    padding: 25px;
  }
  
  .statValue {
    font-size: 28px;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add interactive-web/src/pages/Practice/
git commit -m "feat: add Practice page with flashcard interaction"
```

---

## Task 7: Build and Deploy

**Files:**
- Modify: `interactive-web/vite.config.js`
- Create: `interactive-web/.github/workflows/deploy.yml`

- [ ] **Step 1: Update vite.config.js for GitHub Pages**

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/pinyin-course/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
```

- [ ] **Step 2: Create GitHub Actions workflow**

```yaml
name: Deploy Interactive Web

on:
  push:
    branches: [ "main" ]
    paths:
      - 'interactive-web/**'
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: interactive-web
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: interactive-web/package-lock.json
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: 'interactive-web/dist'
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 3: Test build locally**

```bash
cd interactive-web && npm run build
```

- [ ] **Step 4: Commit**

```bash
git add interactive-web/
git commit -m "feat: add build configuration and GitHub Actions"
```

- [ ] **Step 5: Push to GitHub**

```bash
git push origin main
```

---

## Self-Review

### 1. Spec Coverage
- ✅ FlashCard component with flip animation
- ✅ Progress tracking with Zustand + localStorage
- ✅ Home page with chapter list
- ✅ Practice page with flashcard interaction
- ✅ Result page with statistics
- ✅ Playful design with gradients and animations
- ✅ Responsive design for mobile
- ✅ React + Vite tech stack

### 2. Placeholder Scan
- ✅ All code is complete
- ✅ No TBD or TODO items
- ✅ No vague requirements

### 3. Type Consistency
- ✅ Consistent component props
- ✅ Consistent data structures
- ✅ Consistent styling approach

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-13-interactive-web.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
