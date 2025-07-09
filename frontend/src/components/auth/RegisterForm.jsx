import React, { useState } from 'react';
import { register } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';
import SpecializationSelector from '../patient/SpecializationSelector';
import { setToken } from '../../utils/tokenHelper';

const RegisterForm = ({ role }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [specialization, setSpecialization] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = { ...form, role };
    if (role === 'doctor') {
      payload.specializations = [specialization];
      payload.defaultTimeSlots = ['09:00', '11:00', '14:00'];
    }

    try {
      const res = await register(payload);
      // alert('Registered successfully!');
      setToken(res.data.token);
      localStorage.setItem("role", res.data.role);
      navigate(`/${role}`);
    } catch (err) {
      alert('Registration failed.');
      console.error(err);
    }
  };

  return (
    <div className="w-100 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#0dcaf0' }}>
      <div className="card shadow" style={{ maxWidth: '450px', width: '100%' }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4 text-dark">
            Register as {role.charAt(0).toUpperCase() + role.slice(1)}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-dark">Full Name</label>
              <input type="text" name="name" className="form-control" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label text-dark">Email</label>
              <input type="email" name="email" className="form-control" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label text-dark">Password</label>
              <input type="password" name="password" className="form-control" onChange={handleChange} required />
            </div>
            {role === 'doctor' && (
              <div className="mb-3">
                <label className="form-label text-dark">Specialization</label>
                <SpecializationSelector onSelect={setSpecialization} />
              </div>
            )}
            <button type="submit" className="btn btn-success w-100">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
