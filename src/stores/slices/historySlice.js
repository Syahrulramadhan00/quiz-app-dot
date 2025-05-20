import { createSlice } from '@reduxjs/toolkit';
import { loadHistoryFromLocalStorage } from '../../composables/historyCompose';


const historySlice = createSlice({
  name: 'history',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadHistoryFromLocalStorage.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadHistoryFromLocalStorage.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loadHistoryFromLocalStorage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectHistory = state => state.history.data;

export default historySlice.reducer;
