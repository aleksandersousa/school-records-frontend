import React, { ReactNode, useCallback } from 'react';
import { Navigate, Route } from 'react-router-dom';
import routes from '../config/routes';
import { useAppSelector } from '../hooks/useAppSelector';

interface Props {
  element: ReactNode;
  path: string;
}

const ProtectedRoute: React.FC<Props> = ({ element, path }) => {
  const { currentUser, error } = useAppSelector(state => state.user);

  const isAuthorized = useCallback(
    (): boolean => currentUser != null && !error,
    [currentUser, error]
  );

  if (isAuthorized()) {
    return <Route path={path} element={element}></Route>;
  } else {
    return <Navigate to={routes.defaults.returnBase} />;
  }
};

export default ProtectedRoute;
