import React, { useState } from 'react';
import { login } from '../../api/authApi';
import { setToken } from '../../utils/tokenHelper';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      setToken(res.data.token);

      const role = res.data.user.role;

      // ✅ Correct redirection based on defined routes
      if (role === 'patient') {
        navigate('/patient');
      } else if (role === 'doctor') {
        navigate('/doctor');
      } else if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'pharmacy') {
        navigate('/pharmacy');
      } else {
        navigate('/');
      }
    } catch (err) {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="mb-2 p-2 border rounded w-full"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        className="mb-2 p-2 border rounded w-full"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
