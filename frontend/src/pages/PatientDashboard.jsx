import React, { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import AppointmentCard from '../components/patient/AppointmentCard';
import PrescriptionList from '../components/patient/PrescriptionList';
import { Link } from 'react-router-dom';
import { getMyAppointments } from '../api/appointmentApi';
import { getMyPrescriptions } from '../api/prescriptionApi';

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apptRes = await getMyAppointments();
        setAppointments(apptRes.data);

        const presRes = await getMyPrescriptions();
        setPrescriptions(presRes.data);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <Header />
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4">Welcome back, Divya 👋</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white shadow p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Your Upcoming Appointments</h3>
            {appointments.length ? (
              appointments.map((appt) => (
                <AppointmentCard key={appt._id} appointment={appt} />
              ))
            ) : (
              <p>No upcoming appointments.</p>
            )}
            <Link to="/book" className="mt-4 block text-blue-500">+ Book new appointment</Link>
          </div>

          <div className="bg-white shadow p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Recent Prescriptions</h3>
            <PrescriptionList prescriptions={prescriptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
