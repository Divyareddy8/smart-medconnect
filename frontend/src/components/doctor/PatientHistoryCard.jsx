import React from 'react';

const PatientHistoryCard = ({ patient }) => {
  return (
    <div className="p-4 border rounded mb-2">
      <h4 className="text-lg font-semibold">{patient.name}</h4>
      <p className="text-sm text-gray-600">Past Appointments: {patient.history}</p>
    </div>
  );
};

export default PatientHistoryCard;
