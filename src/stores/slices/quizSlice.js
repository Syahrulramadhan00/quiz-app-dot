import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  quiz: {
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    isLoading: false,
    error: null,
  },
}

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    fetchQuestionsStart: (state) => {
      state.quiz.isLoading = true
      state.quiz.error = null
    },
    fetchQuestionsSuccess: (state, action) => {
      state.quiz.questions = action.payload
      state.quiz.answers = new Array(action.payload.length).fill(null)
      state.quiz.isLoading = false
    },
    fetchQuestionsFailure: (state, action) => {
      state.quiz.isLoading = false
      state.quiz.error = action.payload
    },
    answerQuestion: (state, action) => {
      const { answer, index } = action.payload
      const currentIndex = index !== undefined ? index : state.quiz.currentQuestionIndex
      const currentQuestion = state.quiz.questions[currentIndex]
      if (!currentQuestion) return

      const prevAnswer = state.quiz.answers[currentIndex]
      const wasCorrect = prevAnswer === currentQuestion.correctAnswer
      const isCorrect = answer === currentQuestion.correctAnswer

      if (!wasCorrect && isCorrect) {
        state.quiz.score += 1
      } else if (wasCorrect && !isCorrect) {
        state.quiz.score -= 1
      }

      state.quiz.answers[currentIndex] = answer

      if (index === undefined) {
        state.quiz.currentQuestionIndex += 1
      }
    },
    resetQuiz: (state) => {
      state.quiz.currentQuestionIndex = 0
      state.quiz.score = 0
    },
    goToQuestion: (state, action) => {
      state.quiz.currentQuestionIndex = action.payload
    },
    loadFromStorage: (state, action) => {
      const { questions, answers, currentQuestionIndex } = action.payload
      state.quiz.questions = questions
      state.quiz.answers = answers || Array(questions.length).fill(null)
      state.quiz.currentQuestionIndex = currentQuestionIndex || 0
    },
  },
})

export const {
  fetchQuestionsStart,
  fetchQuestionsSuccess,
  fetchQuestionsFailure,
  answerQuestion,
  resetQuiz,
  goToQuestion,
  loadFromStorage,
} = quizSlice.actions

export default quizSlice.reducer
