import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const Login = lazy(() => import('../pages/login/Login.tsx'));
const Register = lazy(() => import('../pages/register/Register.tsx'));
const AdminPanel = lazy(() => import('../pages/admin/AdminPanel.tsx'));

const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        </Suspense>
    </BrowserRouter>
    );
};

export default AppRouter;
