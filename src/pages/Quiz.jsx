import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCurrentQuestion,
  selectQuiz,
  selectError,
  selectLoading,
} from '../stores/selectors/quizSelectors'
import { answerQuestion, goToQuestion } from '../stores/slices/quizSlice'
import QuestionSheet from '../components/QuestionSheet'
import NavigationQuestion from '../components/NavigationQuestion'

const LOCAL_STORAGE_KEY = 'ongoing_quiz'

export const Quiz = () => {
  const dispatch = useDispatch()
  const quiz = useSelector(selectQuiz)
  const currentQuestion = useSelector(selectCurrentQuestion)
  const isLoading = useSelector(selectLoading)
  const error = useSelector(selectError)
const [selectedAnswer, setSelectedAnswer] = useState(null)
const [questionStatus, setQuestionStatus] = useState([])
const [hasRestored, setHasRestored] = useState(false) 


  // ✅ Load saved progress from localStorage on mount
useEffect(() => {
  if (!hasRestored && !isLoading) {
    const savedQuiz = localStorage.getItem(LOCAL_STORAGE_KEY)
    const parsed = savedQuiz && JSON.parse(savedQuiz)

    console.log('Restoring quiz from localStorage:', parsed)

    if (parsed && parsed.questions && parsed.questions.length > 0) {
      // ✅ Manually restore quiz state if Redux quiz.questions is empty
      dispatch({
        type: 'quiz/loadFromStorage', // custom action (you need to handle this)
        payload: {
          questions: parsed.questions,
          answers: parsed.answers,
          currentQuestionIndex: parsed.currentQuestionIndex,
        },
      })

      setQuestionStatus(parsed.questionStatus || Array(parsed.questions.length).fill('unanswered'))
      setHasRestored(true)
    } else if (quiz.questions.length > 0) {
      // fallback to initializing with Redux-loaded questions
      setQuestionStatus(Array(quiz.questions.length).fill('unanswered'))
      setHasRestored(true)
    }
  }
}, [quiz.questions.length, hasRestored, dispatch, isLoading])


useEffect(() => {
  console.log('[Debug] hasRestored:', hasRestored)
  console.log('[Debug] isLoading:', isLoading)
  console.log('[Debug] quiz.questions.length:', quiz.questions.length)
}, [hasRestored, isLoading, quiz.questions.length])

useEffect(() => {
  console.log('Redux state after restore:', quiz)
}, [quiz])





  // ✅ Save to localStorage on any change
useEffect(() => {
  if (quiz.questions.length > 0) {
    const allAnswered = questionStatus.every((s) => s === 'answered')

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        questions: quiz.questions, // ✅ add this
        currentQuestionIndex: quiz.currentQuestionIndex,
        answers: quiz.answers,
        questionStatus,
        completed: allAnswered,
      })
    )
  }
}, [quiz.questions, quiz.currentQuestionIndex, quiz.answers, questionStatus])


  // ✅ Save to history and clear ongoing quiz if completed
useEffect(() => {
  const allAnswered = questionStatus.length > 0 &&
    questionStatus.every((s) => s === 'answered')

  if (allAnswered) {
    const history = JSON.parse(localStorage.getItem('quiz_history') || '[]')
    const updatedHistory = [
      ...history,
      {
        completedAt: new Date().toISOString(),
        answers: quiz.answers,
        questions: quiz.questions,
      },
    ]

    localStorage.setItem('quiz_history', JSON.stringify(updatedHistory))
    // localStorage.removeItem(LOCAL_STORAGE_KEY)
  }
}, [questionStatus])


  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer)

    setTimeout(() => {
      dispatch(answerQuestion({ answer, index: quiz.currentQuestionIndex }))

      const updatedStatus = [...questionStatus]
      updatedStatus[quiz.currentQuestionIndex] = 'answered'
      setQuestionStatus(updatedStatus)

      if (quiz.currentQuestionIndex < quiz.questions.length - 1) {
        dispatch(goToQuestion(quiz.currentQuestionIndex + 1))
      }

      setSelectedAnswer(null)
    }, 800)
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4'>
      <NavigationQuestion />
      {isLoading && <p className='text-center mt-10'>Loading...</p>}
      {error && <p className='text-red-500 text-center mt-10'>Error: {error}</p>}
      {!currentQuestion && !isLoading && !error && <p className='text-center mt-10'>No question found</p>}
      {currentQuestion && (
        <QuestionSheet
          questionData={currentQuestion}
          currentIndex={quiz.currentQuestionIndex}
          totalQuestions={quiz.questions.length}
          selectedAnswer={selectedAnswer || quiz.answers[quiz.currentQuestionIndex]}
          onAnswerClick={handleAnswerClick}
        />
      )}
    </div>
  )
}
