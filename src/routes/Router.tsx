import React, { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { routes } from '@/config';
import { Login, Register, BaseLayout } from '@/pages';
import { LogoutModal } from '@/components';

import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';

const AppRouter: React.FC = () => {
  const auth = useAuth();

  const [showLogout, setShowLogout] = useState(false);

  window.addEventListener('logout', () => {
    setShowLogout(true);
  });

  return (
    <BrowserRouter>
      <Routes>
        {/* publics */}
        <Route
          path={routes.publics.login.path}
          element={
            auth.user != null ? <Navigate to={routes.privates.home.path} /> : <Login />
          }
        />
        <Route
          path={routes.publics.register.path}
          element={
            auth.user != null ? <Navigate to={routes.privates.home.path} /> : <Register />
          }
        />

        {/* privates */}
        <Route element={<ProtectedRoute />}>
          <Route path={routes.privates.home.path} element={<BaseLayout />}>
            <Route index element={<div>Home</div>} />
            <Route
              path={routes.privates.collegeSubjects.path}
              element={<div>Disciplinas</div>}
            />
            <Route path={routes.privates.courses.path} element={<div>Cursos</div>} />
            <Route path={routes.privates.results.path} element={<div>Resultados</div>} />
            <Route path={routes.privates.students.path} element={<div>Students</div>} />
          </Route>
        </Route>
      </Routes>

      <LogoutModal show={showLogout} onClose={(): void => setShowLogout(false)} />
    </BrowserRouter>
  );
};

export default AppRouter;
