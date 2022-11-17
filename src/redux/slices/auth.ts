/* eslint-disable guard-for-in */
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../models';
import { login, logout, register } from '../thunks/auth';

interface State {
  currentUser: User | null;
  accessToken: string | null;
  error: boolean;
  isLoading: boolean;
}

const INITIAL_STATE: State = {
  currentUser: null,
  accessToken: null,
  error: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    clearUser: state => {
      state.currentUser = null;
      state.accessToken = null;
      state.isLoading = false;
      state.error = false;
    },
  },
  extraReducers: {
    // register user
    [register.pending.toString()]: (state: State) => {
      state.isLoading = true;
      state.error = false;
    },
    [register.fulfilled.toString()]: (state: State, { payload }) => {
      state.isLoading = false;
      state.currentUser = payload.user;
      state.accessToken = payload.token;
    },
    [register.rejected.toString()]: (state: State) => {
      state.isLoading = false;
      state.error = true;
    },

    // login user
    [login.pending.toString()]: (state: State) => {
      state.isLoading = true;
      state.error = false;
    },
    [login.fulfilled.toString()]: (state: State, { payload }) => {
      state.isLoading = false;
      state.currentUser = payload.user;
      state.accessToken = payload.token;
    },
    [login.rejected.toString()]: (state: State) => {
      state.isLoading = false;
      state.error = true;
    },

    // logout user
    [logout.fulfilled.toString()]: (state: State) => {
      state.currentUser = null;
      state.accessToken = null;
      state.isLoading = false;
      state.error = false;
    },
    [logout.rejected.toString()]: (state: State) => {
      state.currentUser = null;
      state.accessToken = null;
      state.isLoading = false;
      state.error = false;
    },
  },
});

export const { clearUser } = authSlice.actions;

export default authSlice.reducer;
