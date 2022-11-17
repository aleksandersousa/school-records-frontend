/* eslint-disable guard-for-in */
import { createSlice } from '@reduxjs/toolkit';
import { Result } from '../../models';
import { createResult, deleteResult, getResults, updateResult } from '../thunks/results';

interface State {
  data: Result[];
  error: boolean;
  isLoading: boolean;
}

const INITIAL_STATE: State = {
  data: [],
  error: false,
  isLoading: false,
};

const resultsSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    resultsClear: state => {
      state.data = [];
      state.isLoading = false;
      state.error = false;
    },
  },
  extraReducers: {
    // get
    [getResults.pending.toString()]: (state: State) => {
      state.isLoading = true;
      state.error = false;
    },
    [getResults.fulfilled.toString()]: (_, { payload }) => ({
      isLoading: false,
      error: false,
      data: payload,
    }),
    [getResults.rejected.toString()]: (state: State) => {
      state.isLoading = false;
      state.error = true;
    },

    // create
    [createResult.fulfilled.toString()]: (state: State, { payload }) => ({
      ...state,
      data: [...state.data, payload],
    }),

    // update
    [updateResult.fulfilled.toString()]: (state: State, { payload }) => ({
      ...state,
      data: state.data.map(d => (d.id === payload.id ? { ...payload } : d)),
    }),

    // delete
    [deleteResult.fulfilled.toString()]: (state: State, { payload }) => ({
      ...state,
      data: state.data.filter(d => d.id !== payload),
    }),
  },
});

export const { resultsClear } = resultsSlice.actions;
export default resultsSlice.reducer;
