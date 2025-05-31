import React, { useEffect, useState } from 'react';

const getOwnAppointmentsApi = 'http://localhost:5050/api/appointments/self'; // fixed typo in URL

async function fetchOwnAppointments() {
  const token = localStorage.getItem('token'); // or from context/cookies/session

  const res = await fetch(getOwnAppointmentsApi, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await res.json();
  return data;
}

const BookAppointment = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await fetchOwnAppointments();
        setAppointments(data);
      } catch (err) {
        console.error('Error loading appointments:', err);
      }
    };

    loadAppointments();
  }, []);

  return (
    <div>
      <h2>Book Appointment</h2>
      <ul>
        {appointments.map((apt, index) => (
          <li key={index}>
            {JSON.stringify(apt)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookAppointment;
