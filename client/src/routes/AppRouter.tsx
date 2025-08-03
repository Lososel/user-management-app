import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Login = lazy(() => import('../pages/login/Login'));
const Register = lazy(() => import('../pages/register/Register'));
const AdminPanel = lazy(() => import('../pages/admin/AdminPanel'));

const AppRouter: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
