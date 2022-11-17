/* eslint-disable guard-for-in */
import { createSlice } from '@reduxjs/toolkit';
import { Student } from '../../models';
import {
  createStudent,
  deleteStudent,
  getStudents,
  updateStudent,
} from '../thunks/students';

interface State {
  data: Student[];
  error: boolean;
  isLoading: boolean;
}

const INITIAL_STATE: State = {
  data: [],
  error: false,
  isLoading: false,
};

const studentsSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    studentsClear: state => {
      state.data = [];
      state.isLoading = false;
      state.error = false;
    },
  },
  extraReducers: {
    // get
    [getStudents.pending.toString()]: (state: State) => {
      state.isLoading = true;
      state.error = false;
    },
    [getStudents.fulfilled.toString()]: (_, { payload }) => ({
      isLoading: false,
      error: false,
      data: payload,
    }),
    [getStudents.rejected.toString()]: (state: State) => {
      state.isLoading = false;
      state.error = true;
    },

    // create
    [createStudent.fulfilled.toString()]: (state: State, { payload }) => ({
      ...state,
      data: [...state.data, payload],
    }),

    // update
    [updateStudent.fulfilled.toString()]: (state: State, { payload }) => ({
      ...state,
      data: state.data.map(d => (d.id === payload.id ? { ...payload } : d)),
    }),

    // delete
    [deleteStudent.fulfilled.toString()]: (state: State, { payload }) => ({
      ...state,
      data: state.data.filter(d => d.id !== payload),
    }),
  },
});

export const { studentsClear } = studentsSlice.actions;
export default studentsSlice.reducer;
