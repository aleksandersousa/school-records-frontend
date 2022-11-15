import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import routes from '@/config/routes';
import { Login, Register } from '@/pages';

import ProtectedRoute from './ProtectedRoute';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* publics */}
        <Route path={routes.publics.login.path} element={<Login />} />
        <Route path={routes.publics.register.path} element={<Register />} />

        {/* privates */}
        <Route element={<ProtectedRoute />}>
          <Route path={routes.privates.home.path} element={<div>Layout</div>}>
            <Route index element={<div>Home</div>} />
            <Route path={routes.privates.students.path} element={<div>Students</div>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
