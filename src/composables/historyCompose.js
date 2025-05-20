import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadHistoryFromLocalStorage = createAsyncThunk(
  'history/loadHistoryFromLocalStorage',
  async () => {
    const rawData = localStorage.getItem('quiz_results');
    if (!rawData) return [];

    try {
      const parsed = JSON.parse(rawData);
      const sortedData = parsed
        .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
        .map(result => {
          const score = Math.round((result.correctCount / result.totalQuestions) * 100);
          return {
            date: new Date(result.submittedAt).toLocaleString('en-US'),
            total: result.totalQuestions,
            correct: result.correctCount,
            wrong: result.wrongCount,
            scores: score,
          };
        });

      return sortedData;
    } catch (e) {
      console.error('Invalid data in localStorage:', e);
      return [];
    }
  }
);