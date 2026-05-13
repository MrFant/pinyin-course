import { memo } from 'react'
import styles from './MarkdownRenderer.module.css'

function parseMarkdown(text) {
  if (!text) return []

  const lines = text.split('\n')
  const elements = []

  lines.forEach((line, index) => {
    const trimmed = line.trim()

    if (!trimmed) {
      elements.push(<br key={index} />)
      return
    }

    // 处理列表项
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const content = trimmed.slice(2)
      elements.push(
        <div key={index} className={styles.listItem}>
          <span className={styles.bullet}>•</span>
          <span>{parseInline(content)}</span>
        </div>
      )
      return
    }

    // 处理数字列表
    if (/^\d+\.\s/.test(trimmed)) {
      const match = trimmed.match(/^(\d+)\.\s(.+)/)
      if (match) {
        elements.push(
          <div key={index} className={styles.listItem}>
            <span className={styles.number}>{match[1]}.</span>
            <span>{parseInline(match[2])}</span>
          </div>
        )
        return
      }
    }

    // 普通段落
    elements.push(
      <p key={index} className={styles.paragraph}>
        {parseInline(trimmed)}
      </p>
    )
  })

  return elements
}

function parseInline(text) {
  // 处理粗体 **text**
  const parts = []
  let remaining = text
  let key = 0

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/)
    const codeMatch = remaining.match(/`(.+?)`/)

    let nextMatch = null
    let matchType = null

    if (boldMatch && (!codeMatch || boldMatch.index < codeMatch.index)) {
      nextMatch = boldMatch
      matchType = 'bold'
    } else if (codeMatch) {
      nextMatch = codeMatch
      matchType = 'code'
    }

    if (!nextMatch) {
      parts.push(<span key={key++}>{remaining}</span>)
      break
    }

    // 添加匹配前的文本
    if (nextMatch.index > 0) {
      parts.push(<span key={key++}>{remaining.slice(0, nextMatch.index)}</span>)
    }

    // 添加匹配的内容
    if (matchType === 'bold') {
      parts.push(<strong key={key++} className={styles.bold}>{nextMatch[1]}</strong>)
    } else if (matchType === 'code') {
      parts.push(<code key={key++} className={styles.code}>{nextMatch[1]}</code>)
    }

    remaining = remaining.slice(nextMatch.index + nextMatch[0].length)
  }

  return parts
}

function MarkdownRenderer({ content, className = '' }) {
  return (
    <div className={`${styles.container} ${className}`}>
      {parseMarkdown(content)}
    </div>
  )
}

export default memo(MarkdownRenderer)
