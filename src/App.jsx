import { useRoutes } from 'react-router-dom'
import { appRoutes } from './routes/route'


export default function App() {
  const element = useRoutes(appRoutes)
  return element
}
