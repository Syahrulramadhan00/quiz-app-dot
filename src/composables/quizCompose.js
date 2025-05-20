import api from '../api/Api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  fetchQuestionsFailure,
  fetchQuestionsStart,
  fetchQuestionsSuccess,
  loadFromStorage,
  resetQuiz,
} from '../stores/slices/quizSlice'
import { throttle } from 'lodash'

const LOCAL_STORAGE_KEY = 'ongoing_quiz'

// 🚀 Fetch questions from API
export const fetchQuizQuestions = (amount) => async (dispatch) => {
  try {
    dispatch(fetchQuestionsStart());
    const response = await api.get('', {
      params: { amount },
    });

    const results = response.data.results.map((question) => ({
      ...question,
      correctAnswer: question.correct_answer,
    }));

    dispatch(fetchQuestionsSuccess(results));
  } catch (error) {
    dispatch(fetchQuestionsFailure(error.message));
  }
}

// ✅ Throttled version
export const throttledFetchQuizQuestions = throttle(
  (amount) => (dispatch) => dispatch(fetchQuizQuestions(amount)),
  5000,
  { leading: true, trailing: false }
)

// ✅ Load saved quiz progress from localStorage
export const loadQuizFromLocalStorage = createAsyncThunk(
  'quiz/loadQuizFromLocalStorage',
  async (_, { dispatch }) => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!saved) return null

    try {
      const parsed = JSON.parse(saved)
      if (parsed?.questions?.length > 0) {
        dispatch(loadFromStorage(parsed))
        return parsed
      }
    } catch (e) {
      console.error('Invalid saved quiz format:', e)
    }

    return null
  }
)

// ✅ Save quiz progress to localStorage
export const saveQuizToLocalStorage = createAsyncThunk(
  'quiz/saveQuizToLocalStorage',
  async ({ quiz, questionStatus }) => {
    const allAnswered = questionStatus.every((s) => s === 'answered')

    const dataToSave = {
      questions: quiz.questions,
      currentQuestionIndex: quiz.currentQuestionIndex,
      answers: quiz.answers,
      questionStatus,
      completed: allAnswered,
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave))
  }
)




