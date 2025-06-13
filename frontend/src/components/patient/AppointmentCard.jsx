import React from 'react';

const AppointmentCard = ({ appointment }) => {
  if (!appointment) return <p>No upcoming appointments.</p>;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-full max-w-md">
      <h3 className="text-xl font-semibold">{appointment.doctorName}</h3>
      <p className="text-gray-600">Date: {appointment.date}</p>
      <p className="text-gray-600">Time: {appointment.time}</p>
      <p className="text-gray-600">Status: {appointment.status}</p>
    </div>
  );
};

export default AppointmentCard;
