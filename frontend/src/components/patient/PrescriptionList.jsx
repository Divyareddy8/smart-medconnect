import React from 'react';

const PrescriptionList = ({ prescriptions }) => {
  return (
    <div className="container mt-4">
      <h3 className="text-primary mb-3">Prescriptions</h3>
      {prescriptions?.length > 0 ? (
        prescriptions.map((prescription, index) => (
          <div key={index} className="card mb-3 shadow-sm">
            <div className="card-body">
              <p><strong>👨‍⚕️ Doctor:</strong> {prescription.doctor}</p>
              <p><strong>📅 Date:</strong> {prescription.date}</p>
              <p><strong>📋 Details:</strong> {prescription.details}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-muted">No prescriptions found.</p>
      )}
    </div>
  );
};

export default PrescriptionList;
