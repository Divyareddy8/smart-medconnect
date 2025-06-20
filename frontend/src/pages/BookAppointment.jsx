import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import BookAppointmentForm from '../components/patient/BookAppointmentForm';

const BookAppointment = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 container py-4">
        <h2 className="mb-4 display-6 fw-bold text-success">Book an Appointment</h2>
        <BookAppointmentForm />
      </main>
      <Footer />
    </div>
  );
};

export default BookAppointment;
