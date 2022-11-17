/* eslint-disable guard-for-in */
import { createSlice } from '@reduxjs/toolkit';
import { Course } from '../../models';
import { createCourse, getCourses, updateCourse } from '../thunks/courses';

interface State {
  data: Course[];
  error: boolean;
  isLoading: boolean;
}

const INITIAL_STATE: State = {
  data: [],
  error: false,
  isLoading: false,
};

const coursesSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    coursesClear: state => {
      state.data = [];
      state.isLoading = false;
      state.error = false;
    },
  },
  extraReducers: {
    // get
    [getCourses.pending.toString()]: (state: State) => {
      state.isLoading = true;
      state.error = false;
    },
    [getCourses.fulfilled.toString()]: (_, { payload }) => ({
      isLoading: false,
      error: false,
      data: payload,
    }),
    [getCourses.rejected.toString()]: (state: State) => {
      state.isLoading = false;
      state.error = true;
    },

    // create
    [createCourse.fulfilled.toString()]: (state: State, { payload }) => ({
      ...state,
      data: [...state.data, payload],
    }),
    // create
    [updateCourse.fulfilled.toString()]: (state: State, { payload }) => ({
      ...state,
      data: state.data.map(d => (d.id === payload.id ? { ...payload } : d)),
    }),
  },
});

export const { coursesClear } = coursesSlice.actions;
export default coursesSlice.reducer;
