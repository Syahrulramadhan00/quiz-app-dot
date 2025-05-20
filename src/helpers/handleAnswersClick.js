
export const processAnswer = ({
  answer,
  currentQuestionIndex,
  dispatch,
  setQuestionStatus,
  questionStatus,
  quizLength,
  goToQuestion,
  answerQuestion,
  setSelectedAnswer,
}) => {
  dispatch(answerQuestion({ answer, index: currentQuestionIndex }))

  const updatedStatus = [...questionStatus]
  updatedStatus[currentQuestionIndex] = 'answered'
  setQuestionStatus(updatedStatus)

  if (currentQuestionIndex < quizLength - 1) {
    dispatch(goToQuestion(currentQuestionIndex + 1))
  }

  setSelectedAnswer(null)
}
