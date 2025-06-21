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
      navigate(`/${role}`);
    } catch (err) {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="d-flex flex-column vh-100 bg-info text-white w-100 m-0">
      <main className="flex-grow-1 d-flex align-items-center justify-content-center px-3">
        <div className="card shadow" style={{ maxWidth: '400px', width: '100%' }}>
          <div className="card-body">
            <h3 className="card-title text-center mb-4 text-dark">Login</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-dark">Email address</label>
                <input type="email" name="email" className="form-control" onChange={handleChange} required />
              </div>
              <div className="mb-4">
                <label className="form-label text-dark">Password</label>
                <input type="password" name="password" className="form-control" onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginForm;
