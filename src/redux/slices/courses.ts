/* eslint-disable guard-for-in */
import { createSlice } from '@reduxjs/toolkit';
import { Course } from '../../models';

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
    getCoursesStart: state => {
      state.isLoading = true;
    },
    setCourses: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    addCourse: (state, action) => {
      state.data.push(action.payload);
      state.isLoading = false;
    },
    udpateCourses: (state, action) => {
      for (const c of state.data) {
        if (c.id === action.payload.id) {
          c.name = action.payload.name;
          c.code = action.payload.code;

          break;
        }
      }
      state.isLoading = false;
    },
    coursesFailure: state => {
      state.isLoading = false;
      state.error = true;
    },
    coursesClear: state => {
      state.data = [];
      state.isLoading = false;
      state.error = false;
    },
  },
});

export const {
  getCoursesStart,
  setCourses,
  addCourse,
  udpateCourses,
  coursesFailure,
  coursesClear,
} = coursesSlice.actions;
export default coursesSlice.reducer;
