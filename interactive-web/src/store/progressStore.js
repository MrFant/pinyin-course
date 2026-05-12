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
