import { useEffect } from 'react';
import { authApi } from '../services/api';
import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';

const useFetch = <T = unknown>(
  url: string,
  actionStart: () => PayloadAction<T>,
  actionSuccess: (args: PayloadAction<T | undefined>) => PayloadAction<T>,
  actionFailure: () => PayloadAction<T>,
  queryParams?: unknown
): void => {
  const dispatch = useAppDispatch();

  const { accessToken } = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(actionStart());

    authApi
      .get(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken as string}`,
        },
        params: queryParams,
      })
      .then(res => dispatch(actionSuccess(res.data)))
      .catch(() => dispatch(actionFailure()));
  }, []);
};

export default useFetch;
