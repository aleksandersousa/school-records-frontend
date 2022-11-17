import { User } from '@/models';
import { authApi } from '@/services/api';
import { useMemo } from 'react';
import useAppSelector from './useAppSelector';

const useAuth = (): { user: User | null } => {
  const { currentUser: user, accessToken } = useAppSelector(state => state.user);

  if (accessToken) {
    authApi.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }

  return useMemo(() => ({ user }), [user]);
};

export default useAuth;
