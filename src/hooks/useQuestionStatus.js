
import { useEffect, useState } from 'react'

export const useQuestionStatus = (quiz, hasRestored) => {
  const [status, setStatus] = useState([])

  useEffect(() => {
    if (quiz.questions.length > 0 && hasRestored) {
      setStatus(Array(quiz.questions.length).fill('unanswered'))
    }
  }, [quiz.questions.length, hasRestored])

  return [status, setStatus]
}
