import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '@/hooks/useAppSelector';
import routes from '@/config/routes';

const ProtectedRoute: React.FC = () => {
  const { currentUser } = useAppSelector(state => state.user);

  return currentUser !== null ? <Outlet /> : <Navigate to={routes.defaults.returnBase} />;
};

export default ProtectedRoute;
