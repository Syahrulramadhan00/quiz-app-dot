import { createAsyncThunk } from '@reduxjs/toolkit'

export const checkOngoingQuizFromLocalStorage = createAsyncThunk(
  'quiz/checkOngoingQuizFromLocalStorage',
  async () => {
    const rawData = localStorage.getItem('ongoing_quiz');
    if (!rawData) return null;

    try {
      const parsed = JSON.parse(rawData);
      if (
        parsed &&
        typeof parsed === 'object' &&
        Array.isArray(parsed.questions) &&
        typeof parsed.currentQuestionIndex === 'number'
      ) {
        return parsed;
      } else {
        console.warn('Invalid ongoing_quiz structure:', parsed);
        return null;
      }
    } catch (e) {
      console.error('Invalid JSON in ongoing_quiz:', e);
      return null;
    }
  }
);
