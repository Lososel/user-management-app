import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../input/Input.tsx';
import { loginUser } from '../../api/auth.ts';
import { useNavigate } from 'react-router-dom';


interface LoginFormData {
email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginFormData>();
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigare = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginUser(data.email, data.password);
      setMessage(`${response.message}`);
      
      if (response.token) {
        localStorage.setItem('token', response.token);
        navigare('/admin');
      }

      reset();
      setFormData({ email: '', password: '' });

    } catch (error) {
      setMessage(`${(error as Error).message}`);
    }
  };

  return (
    <div>
      <div className="card p-4">
        <h4 className="mb-3">Login</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            labelText="Email"
            id="email"
            name="email"
            type="email"
            placeholder="user@example.com"
            value={formData.email}
            disabled={false}
            autoComplete="email"
            register={register('email', { required: 'Email is required' })}
            error={errors.email}
            onChange={handleChange}
          />

          <Input
            labelText="Password"
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            disabled={false}
            autoComplete="current-password"
            register={register('password', { required: 'Password is required' })}
            error={errors.password}
            onChange={handleChange}
          />

          <button type="submit" className="btn btn-primary w-100 mt-2">Login</button>
        </form>
        {message && <div className="alert alert-danger mt-3">{message}</div>}
      </div>
    </div>
  );
};

export default LoginForm;
