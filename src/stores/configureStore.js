
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import quizReducer from './slices/quizSlice'
import historyReducer from './slices/historySlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    quiz: quizReducer,
    history: historyReducer,
  },
})

export default store
