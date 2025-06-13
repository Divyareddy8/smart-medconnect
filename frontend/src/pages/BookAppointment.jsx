import React from 'react';
import BookAppointmentForm from '../components/patient/BookAppointmentForm';
import Header from '../components/common/Header';

const BookAppointment = () => {
  return (
    <div className="p-4">
      <Header />
      <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>
      <BookAppointmentForm />
    </div>
  );
};

export default BookAppointment;