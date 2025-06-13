import React from 'react';

const AppointmentTable = () => {
  const dummyAppointments = [
    { id: 1, patient: 'Alice', time: '10:00 AM' },
    { id: 2, patient: 'Bob', time: '11:00 AM' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border">Patient</th>
            <th className="px-4 py-2 border">Time</th>
          </tr>
        </thead>
        <tbody>
          {dummyAppointments.map((appt) => (
            <tr key={appt.id}>
              <td className="px-4 py-2 border">{appt.patient}</td>
              <td className="px-4 py-2 border">{appt.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;