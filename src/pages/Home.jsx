import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { CardMenu } from '../components/CardMenu'
import { checkOngoingQuizFromLocalStorage } from '../composables/homeCompose'


export const Home = () => {
  const [menuType, setMenuType] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const checkQuiz = async () => {
      const resultAction = await dispatch(checkOngoingQuizFromLocalStorage())
      const quizData = resultAction.payload
      setMenuType(quizData ? 'continue' : 'new')
    }

    checkQuiz()
  }, [dispatch])

  if (menuType === null) return <div>Loading...</div>

  return (
    <div>
      <CardMenu type={menuType} />
    </div>
  )
}
