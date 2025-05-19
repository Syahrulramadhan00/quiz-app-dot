import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { throttledFetchQuizQuestions } from '../composables/quizCompose'

export const CardMenu = () => {
  const [amount, setAmount] = useState(10)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleStart = async () => {
    await dispatch(throttledFetchQuizQuestions(amount));
    navigate('/quiz');
  };

  return (
    <div className='flex justify-center min-h-screen items-center'>
      <div className='bg-white shadow-lg rounded-lg p-4 text-center w-1/2'>
        <p className='text-xl font-semibold mb-2'>Welcome</p>
        <p className='mb-4'>Enter how many questions you want</p>

        <div className='flex flex-col gap-4 items-center'>
          <input
            type='number'
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className='w-1/2 px-4 py-3 rounded-xl border border-gray-300'
            min={1}
            max={50}
            placeholder='Number of Questions'
          />

          <button
            onClick={handleStart}
            className='bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 mt-4'
            disabled={!amount || amount < 1}
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  )
}
