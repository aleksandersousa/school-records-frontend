/* eslint-disable guard-for-in */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../models';

interface State {
  currentUser: User | null;
  error: boolean;
  isLoading: boolean;
}

const INITIAL_STATE: State = {
  currentUser: null,
  error: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    registerStart: state => {
      state.isLoading = true;
    },
    registerSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    registerFailure: state => {
      state.isLoading = false;
      state.error = true;
    },
    loginStart: state => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    loginFailure: state => {
      state.isLoading = false;
      state.error = true;
    },
    logout: state => {
      state.currentUser = null;
      state.isLoading = false;
      state.error = false;
    },
  },
});

export const {
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
