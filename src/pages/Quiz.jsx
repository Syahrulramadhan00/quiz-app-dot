import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCurrentQuestion,
  selectQuiz,
  selectError,
  selectLoading,
} from '../stores/selectors/quizSelectors'
import { answerQuestion, goToQuestion, resetQuiz } from '../stores/slices/quizSlice'
import QuestionSheet from '../components/QuestionSheet'
import NavigationQuestion from '../components/NavigationQuestion'
import {
  loadQuizFromLocalStorage,
  saveQuizToLocalStorage,

} from '../composables/quizCompose'
import { useQuestionStatus } from '../hooks/useQuestionStatus'
import { processAnswer } from '../helpers/handleAnswersClick'
import { TimerQuiz } from '../components/TimerQuiz'

export const Quiz = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const LOCAL_STORAGE_KEY = 'ongoing_quiz'

  const quiz = useSelector(selectQuiz)
  const currentQuestion = useSelector(selectCurrentQuestion)
  const isLoading = useSelector(selectLoading)
  const error = useSelector(selectError)

  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [hasRestored, setHasRestored] = useState(false) 
  const [questionStatus, setQuestionStatus] = useQuestionStatus(quiz, hasRestored)

  // ✅ Load saved progress from localStorage
  useEffect(() => {
    if (!hasRestored && !isLoading) {
      dispatch(loadQuizFromLocalStorage()).then((res) => {
        const parsed = res.payload
        if (parsed && parsed.questions?.length > 0) {
          setQuestionStatus(parsed.questionStatus || Array(parsed.questions.length).fill('unanswered'))
        } else if (quiz.questions.length > 0) {
          setQuestionStatus(Array(quiz.questions.length).fill('unanswered'))
        }
        setHasRestored(true)
      })
    }
  }, [quiz.questions.length, hasRestored, dispatch, isLoading])

  // ✅ Save to localStorage on updates
  useEffect(() => {
    if (quiz.questions.length > 0) {
      dispatch(saveQuizToLocalStorage({ quiz, questionStatus }))
    }
  }, [quiz.questions, quiz.currentQuestionIndex, quiz.answers, questionStatus, dispatch])

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer)
    setTimeout(() => {
      processAnswer({
        answer,
        currentQuestionIndex: quiz.currentQuestionIndex,
        dispatch,
        setQuestionStatus,
        questionStatus,
        quizLength: quiz.questions.length,
        goToQuestion,
        answerQuestion,
        setSelectedAnswer,
      })
    }, 800)
  }
  
const handleSubmit = () => {
  const totalQuestions = quiz.questions.length
  let correctCount = 0
  let wrongCount = 0

  quiz.questions.forEach((q, idx) => {
    const selected = quiz.answers[idx]
    if (selected === q.correctAnswer) {
      correctCount++
    } else {
      wrongCount++
    }
  })

  // ✅ Save only result summary (NOT questions/answers)
  const results = JSON.parse(localStorage.getItem('quiz_results') || '[]')
  const updatedResults = [
    ...results,
    {
      submittedAt: new Date().toISOString(),
      totalQuestions,
      correctCount,
      wrongCount,
    },
  ]

  localStorage.setItem('quiz_results', JSON.stringify(updatedResults))
  localStorage.removeItem(LOCAL_STORAGE_KEY)
  dispatch(resetQuiz())
  navigate('/history')
}

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4'>
        {quiz.questions.length > 0 && (
        <div className="flex justify-center py-5">
            <TimerQuiz totalQuestions={quiz.questions.length} onTimeUp={handleSubmit} />
        </div>
        )}
      <NavigationQuestion />
      {isLoading && <p className='text-center mt-10'>Loading...</p>}
      {error && <p className='text-red-500 text-center mt-10'>Error: {error}</p>}
      {!currentQuestion && !isLoading && !error && (
        <p className='text-center mt-10'>No question found</p>
      )}

      {currentQuestion && (
        <QuestionSheet
          questionData={currentQuestion}
          currentIndex={quiz.currentQuestionIndex}
          totalQuestions={quiz.questions.length}
          selectedAnswer={selectedAnswer || quiz.answers[quiz.currentQuestionIndex]}
          onAnswerClick={handleAnswerClick}
        />
      )}

      {quiz.questions.length > 0 && (
        <button
          onClick={handleSubmit}
          className='mt-6 bg-primary text-white font-medium py-2 px-4 rounded hover:bg-primary/90 transition'
        >
          Submit Quiz
        </button>
      )}
    </div>
  )
}
