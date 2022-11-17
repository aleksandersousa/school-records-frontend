import { User } from '@/models';
import { authApi, publicApi } from '@/services/api';
import { showToast } from '@/utils/notifiers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearUser } from '../slices/auth';

export const register = createAsyncThunk(
  'user/register',
  async (body: { user: User }, { dispatch, rejectWithValue }) => {
    try {
      const res = await publicApi.post<User>('/users', body);
      const user = res.data;
      const token = res.headers.authorization?.split(' ')[1];
      authApi.defaults.headers.common.Authorization = `Bearer ${token as string}`;

      const payload = {
        user,
        token,
      };

      return payload;
    } catch (error: any) {
      dispatch(clearUser());

      if (error.response?.data.errors.email[0]) {
        showToast(`email  ${error.response?.data.errors.email[0] as string}.`, 'error');
        return rejectWithValue(error.response?.data.errors.email[0]);
      }

      showToast('Erro ao criar conta.', 'error');

      // return custom error message from API if any
      if (error.response?.data.message) {
        console.log(error.response?.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (body: { user: User }, { dispatch, rejectWithValue }) => {
    try {
      const res = await publicApi.post<User>('/users/sign_in', body);
      const user = res.data;
      const token = res.headers.authorization?.split(' ')[1];
      authApi.defaults.headers.common.Authorization = `Bearer ${token as string}`;

      const payload = {
        user,
        token,
      };

      return payload;
    } catch (error: any) {
      showToast('Email ou senha incorretos', 'error');
      dispatch(clearUser());

      // return custom error message from API if any
      if (error.response?.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const logout = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
  try {
    await authApi.delete('/users/sign_out');
    showToast('Saiu com sucesso!', 'success');
  } catch (error: any) {
    showToast('Erro ao sair', 'error');

    // return custom error message from API if any
    if (error.response?.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
