
import { useDispatch, useSelector } from 'react-redux'
import { selectQuiz } from '../stores/selectors/quizSelectors'
import { goToQuestion } from '../stores/slices/quizSlice'


const NavigationQuestion = () => {
  const dispatch = useDispatch()
  const quiz = useSelector(selectQuiz)

  const handleQuestionClick = (index) => {
    dispatch(goToQuestion(index))
  }

  return (
    <div className='flex flex-wrap justify-center gap-2 mb-6'>
      {quiz.questions.map((q, idx) => {
        const isAnswered = quiz.answers[idx] !== null && quiz.answers[idx] !== undefined
        const isCurrent = idx === quiz.currentQuestionIndex

        return (
          <button
            key={idx}
            onClick={() => handleQuestionClick(idx)}
            className={`w-10 h-10 rounded-xl text-sm font-medium border transition
              ${isCurrent ? 'bg-primary text-white' :
                isAnswered ? 'bg-primary/80 text-white border-white':
                'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}
            `}
          >
            {idx + 1}
          </button>
        )
      })}
    </div>
  )
}

export default NavigationQuestion
