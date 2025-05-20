
import { useEffect, useState } from 'react'

const TIMER_KEY = 'quiz_start_time'

export const useTimerQuiz = ({ totalQuestions, onTimeUp }) => {
  const totalDuration = totalQuestions * 60 // 60s per question

  const getInitialTimeLeft = () => {
    const storedStart = localStorage.getItem(TIMER_KEY)
    const now = Date.now()

    if (storedStart) {
      const elapsed = Math.floor((now - parseInt(storedStart, 10)) / 1000)
      return Math.max(totalDuration - elapsed, 0)
    } else {
      localStorage.setItem(TIMER_KEY, now.toString())
      return totalDuration
    }
  }

  const [timeLeft, setTimeLeft] = useState(getInitialTimeLeft)

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp()
      localStorage.removeItem(TIMER_KEY)
      return
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          onTimeUp()
          localStorage.removeItem(TIMER_KEY)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [timeLeft, onTimeUp])

  return timeLeft
}
