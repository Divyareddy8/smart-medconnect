import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import AppointmentTable from '../components/doctor/AppointmentTable';
import PrescriptionForm from '../components/doctor/PrescriptionForm';

const DoctorDashboard = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 container py-4">
        <h2 className="mb-4 display-6 fw-bold text-info">Doctor Panel</h2>
        <AppointmentTable />
        <PrescriptionForm />
      </main>
      <Footer />
    </div>
  );
};

export default DoctorDashboard;
