import React, { useState } from 'react';

const PrescriptionForm = () => {
  const [form, setForm] = useState({ patient: '', medicine: '', dosage: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Prescription Issued:', form);
    setForm({ patient: '', medicine: '', dosage: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md w-full max-w-md">
      <h3 className="text-xl font-bold mb-4">Issue Prescription</h3>
      <input
        type="text"
        name="patient"
        value={form.patient}
        onChange={handleChange}
        placeholder="Patient Name"
        className="border p-2 w-full mb-2"
        required
      />
      <input
        type="text"
        name="medicine"
        value={form.medicine}
        onChange={handleChange}
        placeholder="Medicine"
        className="border p-2 w-full mb-2"
        required
      />
      <input
        type="text"
        name="dosage"
        value={form.dosage}
        onChange={handleChange}
        placeholder="Dosage"
        className="border p-2 w-full mb-4"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
};

export default PrescriptionForm;