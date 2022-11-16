import { User } from '@/models';
import { useMemo } from 'react';
import { useAppSelector } from './useAppSelector';

export const useAuth = (): { user: User | null } => {
  const user = useAppSelector(state => state.user.currentUser);

  return useMemo(() => ({ user }), [user]);
};
