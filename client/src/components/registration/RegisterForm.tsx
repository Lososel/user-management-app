import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../input/Input.tsx';
import { registerUser } from '../../api/auth.ts';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<RegisterFormData>();
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await registerUser(data.name, data.email, data.password);
      if (response.token) {
        localStorage.setItem('token', response.token);
        toast.success('Registration successful!');
        navigate('/admin');
      } else {
        toast.info(response.message || 'Registration completed, please login.');
        navigate('/login');
      }
      reset();
      setFormData({ name: '', email: '', password: '' });
    } catch (error) {
      toast.error((error as Error).message || 'Registration failed.');
    }
  };

  return (
    <div >
      <div className="card p-4">
        <h4 className="mb-3">Register</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            labelText="Name"
            id="name"
            name="name"
            placeholder="Ivan Ivanov"
            value={formData.name}
            disabled={false}
            autoComplete="name"
            register={register('name', { required: 'Name is required' })}
            error={errors.name}
            onChange={handleChange}
          />

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
            autoComplete="new-password"
            register={register('password', { required: 'Password is required' })}
            error={errors.password}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-primary w-100 mt-2">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
