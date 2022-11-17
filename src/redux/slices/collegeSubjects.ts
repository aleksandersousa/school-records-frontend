/* eslint-disable guard-for-in */
import { createSlice } from '@reduxjs/toolkit';
import { CollegeSubject } from '../../models';
import {
  createCollegeSubject,
  getCollegeSubjects,
  updateCollegeSubject,
} from '../thunks/collegeSubjects';

interface State {
  data: CollegeSubject[];
  error: boolean;
  isLoading: boolean;
}

const INITIAL_STATE: State = {
  data: [],
  error: false,
  isLoading: false,
};

const collegeSubjectsSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    addCollegeSubject: (state, action) => {
      state.data.push(action.payload);
      state.isLoading = false;
    },
    udpateCollegeSubjects: (state, action) => {
      for (const c of state.data) {
        if (c.id === action.payload.id) {
          c.name = action.payload.name;
          c.code = action.payload.code;
          c.workload = action.payload.workload;
          c.course = action.payload.course;
          c.course_id = action.payload.course_id;

          break;
        }
      }
      state.isLoading = false;
    },
    collegeSubjectsFailure: state => {
      state.isLoading = false;
      state.error = true;
    },
    collegeSubjectsClear: state => {
      state.data = [];
      state.isLoading = false;
      state.error = false;
    },
  },
  extraReducers: {
    // get
    [getCollegeSubjects.pending.toString()]: (state: State) => {
      state.isLoading = true;
      state.error = false;
    },
    [getCollegeSubjects.fulfilled.toString()]: (_, { payload }) => ({
      isLoading: false,
      error: false,
      data: payload,
    }),
    [getCollegeSubjects.rejected.toString()]: (state: State) => {
      state.isLoading = false;
      state.error = true;
    },

    // create
    [createCollegeSubject.fulfilled.toString()]: (state: State, { payload }) => ({
      ...state,
      data: [...state.data, payload],
    }),
    // create
    [updateCollegeSubject.fulfilled.toString()]: (state: State, { payload }) => ({
      ...state,
      data: state.data.map(d => (d.id === payload.id ? { ...payload } : d)),
    }),
  },
});

export const {
  addCollegeSubject,
  udpateCollegeSubjects,
  collegeSubjectsFailure,
  collegeSubjectsClear,
} = collegeSubjectsSlice.actions;
export default collegeSubjectsSlice.reducer;
