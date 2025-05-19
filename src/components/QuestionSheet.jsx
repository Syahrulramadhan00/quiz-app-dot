const QuestionSheet = ({
  questionData,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onAnswerClick
}) => {
  const answers = questionData
    ? [...questionData.incorrect_answers, questionData.correctAnswer] 
    : []

  return (
    <div className='bg-white shadow-md rounded-lg p-6 max-w-xl w-full'>
      <p className='text-gray-600 mb-2'>Category: {questionData.category}</p>
      <p
        className='text-lg font-semibold mb-4'
        dangerouslySetInnerHTML={{ __html: questionData.question }}
      />
      <div className='grid gap-3'>
        {answers.map((answer, idx) => (
          <button
            key={idx}
            onClick={() => onAnswerClick(answer)}
            className={`
              border rounded-lg p-3 text-left transition
              ${selectedAnswer === answer
                ? 'bg-blue-100 border-blue-500 text-blue-700'
                : 'hover:bg-primary/10 border-gray-300'}
            `}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </div>
      <div className='mt-4 text-right text-sm text-gray-500'>
        Question {currentIndex + 1} of {totalQuestions}
      </div>
    </div>
  )
}

export default QuestionSheet
