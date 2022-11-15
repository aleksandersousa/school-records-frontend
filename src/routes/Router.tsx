import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from '../config/routes';
import ProtectedRoute from './ProtectedRoute';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* publics */}
        <Route path={routes.publics.login.path} element={<div>Login</div>} />

        {/* privates */}
        <ProtectedRoute path={routes.privates.home.path} element={<div>Home</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
