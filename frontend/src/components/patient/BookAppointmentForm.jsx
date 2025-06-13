import React, { useState } from 'react';

const BookAppointmentForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ doctor: '', date: '', time: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <div className="mb-4">
        <label className="block text-gray-700">Doctor Name</label>
        <input name="doctor" value={formData.doctor} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" required />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Date</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" required />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Time</label>
        <input type="time" name="time" value={formData.time} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" required />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Book Appointment</button>
    </form>
  );
};

export default BookAppointmentForm;
