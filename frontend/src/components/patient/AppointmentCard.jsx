import React from 'react';

const AppointmentCard = ({ appointment = null, prescriptionLoader }) => {
  if (!appointment) return <p className="text-muted">No upcoming appointments.</p>;
  return (
    <div className="card shadow-sm mb-4 mx-auto" style={{ maxWidth: '500px' }}>
      <div className="card-body">
        <h5 className="card-title text-primary">{appointment.doctor.name}</h5>
        <p className="card-text">📅 Date: {appointment.date.substr(0, 10)}</p>
        <p className="card-text">⏰ Time: {appointment.time}</p>
        <p className="card-text">📌 Status: {appointment.status}</p>
        <div className="px-4 py-2"><button className="btn-custom text-white px-4 py-2 rounded" onClick={(e)=>{
          e.preventDefault(); 
          if (!appointment.prescription) {
            return prescriptionLoader({
              issueDate: "Not Issued",
              medicines: []
            })
          }
          return prescriptionLoader(appointment.prescription);
        }
        }>View Prescription</button></div>
      </div>
    </div>
  );
};

export default AppointmentCard;
