import React from 'react';
import AppointmentTable from '../components/doctor/AppointmentTable';
import PrescriptionForm from '../components/doctor/PrescriptionForm';
import Header from '../components/common/Header';

const DoctorDashboard = () => {
  return (
    <div className="p-4">
      <Header />
      <h2 className="text-2xl font-bold mb-4">Doctor Panel</h2>
      <AppointmentTable />
      <PrescriptionForm />
    </div>
  );
};

export default DoctorDashboard;
