import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { routes } from '@/config';
import { useAuth } from '@/hooks/useAuth';

const ProtectedRoute: React.FC = () => {
  const auth = useAuth();

  return auth.user != null ? <Outlet /> : <Navigate to={routes.defaults.returnBase} />;
};

export default ProtectedRoute;
