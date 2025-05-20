
import { MdAccessTime } from 'react-icons/md'
import { useTimerQuiz } from '../hooks/useTimerQuiz'
import { formatTime } from '../utils/convertTime'


export const TimerQuiz = ({ totalQuestions, onTimeUp }) => {
  if (!totalQuestions || totalQuestions <= 0) return null

  const timeLeft = useTimerQuiz({ totalQuestions, onTimeUp })

  return (
    <div className="flex items-center space-x-2 whitespace-nowrap">
      <MdAccessTime className="w-6 h-6 text-gray-700" />
      <span className="text-2xl font-semibold text-gray-800">{formatTime(timeLeft)}</span>
    </div>
  )
}
