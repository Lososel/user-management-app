import React from 'react';
import RegisterForm from '../../components/registration/RegisterForm';

const Register: React.FC = () => {
    return (
        <div>
            <RegisterForm />
            <p className="mt-3">
            Already have an account?{' '}
            <a href="/login" className="btn btn-link p-0">Sign in</a>
            </p>
        </div>
    );
};

export default Register;
