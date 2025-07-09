import React from 'react';

const PrescriptionList = ({ prescription=null }) => {
  console.log(prescription)
  return (
    <div className="container mt-4">
      <h3 className="text-primary mb-3">Prescription</h3>
      {prescription !== null ? (
          <div className="card mb-3 shadow-sm">
            <div className="card-body">
              {/* <p><strong>👨‍⚕️ Doctor:</strong> {prescription.doctor.name}</p> */}
              <p><strong>📅 Date:</strong> {prescription.issueDate.substr(0, 10)}</p>
              <table className="table-auto w-full border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 border">Medicine</th>
                    <th className="px-4 py-2 border">Dosage</th>
                    <th className="px-4 py-2 border">Duration</th>
                  </tr>
                </thead>
                <tbody>
                {
                  prescription.medicines.map(({medicineName, dosage, duration}, index)=>{
                    return (<tr key={index}>
                      <td className="border p-2 w-full mb-2">{medicineName}</td>
                      <td className="border p-2 w-full mb-2">{dosage}</td>
                      <td className="border p-2 w-full mb-2">{duration}</td>
                    </tr>)
                  })
                }
                </tbody>
              </table>
              {/* <p><strong>📋 Details:</strong> {prescription.details}</p> */}
            </div>
          </div>
      ) : (
        <p className="text-muted">No prescriptions selected.</p>
      )}
    </div>
  );
};

export default PrescriptionList;
