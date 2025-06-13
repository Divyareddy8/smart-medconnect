import React, { useState } from 'react';
import { register } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';

const RegisterForm = ({ role }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ ...form, role });
      alert('Registered successfully!');
      navigate('/login');
    } catch (err) {
      alert('Registration failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
      <h2 className="text-xl font-bold mb-4">Register as {role}</h2>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} className="mb-2 p-2 border rounded w-full" />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} className="mb-2 p-2 border rounded w-full" />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} className="mb-4 p-2 border rounded w-full" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">Register</button>
    </form>
  );
};

export default RegisterForm;