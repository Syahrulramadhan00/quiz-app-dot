
export const selectQuiz = (state) => state.quiz.quiz
export const selectQuestions = (state) => state.quiz.quiz.questions
export const selectCurrentQuestion = (state) =>
    state.quiz.quiz.questions[state.quiz.quiz.currentQuestionIndex]
export const selectScore = (state) => state.quiz.quiz.score
export const selectLoading = (state) => state.quiz.quiz.isLoading
export const selectError = (state) => state.quiz.quiz.error

