import api from '../api/Api'
import {
  fetchQuestionsFailure,
  fetchQuestionsStart,
  fetchQuestionsSuccess
} from '../stores/slices/quizSlice'
import { throttle } from 'lodash'


export const fetchQuizQuestions = (amount) => async (dispatch) => {
  try {
    dispatch(fetchQuestionsStart());
    console.log('Calling API with:', { amount });

    const response = await api.get('', {
      params: {
        amount,
      },
    });

    const results = response.data.results.map((question) => ({
      ...question,
      correctAnswer: question.correct_answer,
    }));

    console.log('Fetched questions:', results);

    dispatch(fetchQuestionsSuccess(results));
  } catch (error) {
    dispatch(fetchQuestionsFailure(error.message));
  }
};

// Throttled version with amount only
export const throttledFetchQuizQuestions = throttle(
  (amount) => (dispatch) => dispatch(fetchQuizQuestions(amount)),
  5000,
  { leading: true, trailing: false }
);
