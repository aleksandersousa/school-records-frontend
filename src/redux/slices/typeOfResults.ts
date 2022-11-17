/* eslint-disable guard-for-in */
import { createSlice } from '@reduxjs/toolkit';
import { TypeOfResult } from '@/models';
import { getTypeOfResults } from '../thunks/typeOfResults';

interface State {
  data: TypeOfResult[];
  error: boolean;
  isLoading: boolean;
}

const INITIAL_STATE: State = {
  data: [],
  error: false,
  isLoading: false,
};

const typeOfResultsSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    typeOfResultsClear: state => {
      state.data = [];
      state.isLoading = false;
      state.error = false;
    },
  },
  extraReducers: {
    // get
    [getTypeOfResults.pending.toString()]: (state: State) => {
      state.isLoading = true;
      state.error = false;
    },
    [getTypeOfResults.fulfilled.toString()]: (_, { payload }) => ({
      isLoading: false,
      error: false,
      data: payload,
    }),
    [getTypeOfResults.rejected.toString()]: (state: State) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const { typeOfResultsClear } = typeOfResultsSlice.actions;
export default typeOfResultsSlice.reducer;
