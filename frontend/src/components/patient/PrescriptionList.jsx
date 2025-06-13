import React from 'react';

const PrescriptionList = ({ prescriptions }) => {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Prescriptions</h2>
      {prescriptions?.length > 0 ? (
        prescriptions.map((prescription, index) => (
          <div key={index} className="bg-white shadow p-4 rounded mb-3">
            <p><strong>Doctor:</strong> {prescription.doctor}</p>
            <p><strong>Date:</strong> {prescription.date}</p>
            <p><strong>Details:</strong> {prescription.details}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No prescriptions found.</p>
      )}
    </div>
  );
};

export default PrescriptionList;
