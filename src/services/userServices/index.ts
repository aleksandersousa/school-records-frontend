import { User } from '@/models';
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
  registerFailure,
  registerStart,
  registerSuccess,
} from '@/redux/ducks/auth';
import { authApi, publicApi } from '../api';

export const login = async (
  body: { user: User },
  dispatch: (args: PayloadAction<User | undefined>) => PayloadAction<User>
): Promise<void> => {
  try {
    dispatch(loginStart());

    const res = await publicApi.post<User>('/users/sign_in', body);
    const user = res.data;
    const token = res.headers.authorization?.split(' ')[1];

    dispatch(loginSuccess(user));

    authApi.defaults.headers.common.Authorization = `Bearer ${token as string}`;

    console.log(token);
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const register = async (
  body: { user: User },
  dispatch: (args: PayloadAction<User | undefined>) => PayloadAction<User>
): Promise<void> => {
  try {
    dispatch(registerStart());

    const res = await publicApi.post<User>('/users', body);
    const user = res.data;
    const token = res.headers.authorization?.split(' ')[1];

    dispatch(registerSuccess(user));

    authApi.defaults.headers.common.Authorization = `Bearer ${token as string}`;
  } catch (error) {
    dispatch(registerFailure());
  }
};

export const signout = async (
  dispatch: (args: PayloadAction<User | undefined>) => PayloadAction<User>
): Promise<void> => {
  try {
    await authApi.delete('/users');
    dispatch(logout());
  } catch (error) {
    dispatch(logout());
  }
};
