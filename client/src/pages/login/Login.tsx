import React from 'react';
import LoginForm from '../../components/login/LoginForm';

const Login: React.FC = () => {
  return (
    <div>
      <LoginForm />
      <p className="mt-3">
        Don’t have an account?{' '}
        <a href="/register" className="btn btn-link p-0">Sign up</a>
      </p>
    </div>
  );
};

export default Login;
