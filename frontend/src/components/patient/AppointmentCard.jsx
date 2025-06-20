import React from 'react';

const AppointmentCard = ({ appointment }) => {
  if (!appointment) return <p className="text-muted">No upcoming appointments.</p>;

  return (
    <div className="card shadow-sm mb-4 mx-auto" style={{ maxWidth: '500px' }}>
      <div className="card-body">
        <h5 className="card-title text-primary">{appointment.doctorName}</h5>
        <p className="card-text">📅 Date: {appointment.date}</p>
        <p className="card-text">⏰ Time: {appointment.time}</p>
        <p className="card-text">📌 Status: {appointment.status}</p>
      </div>
    </div>
  );
};

export default AppointmentCard;
