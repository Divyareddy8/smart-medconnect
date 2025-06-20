import React, { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
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
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Header />
      <main className="flex-grow-1 container py-4">
        <h2 className="mb-4 display-6 fw-semibold">Welcome !👋</h2>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="bg-white p-4 rounded shadow-sm">
              <h4 className="fw-bold mb-3">Your Upcoming Appointments</h4>
              {appointments.length ? (
                appointments.map((appt) => (
                  <AppointmentCard key={appt._id} appointment={appt} />
                ))
              ) : (
                <p>No upcoming appointments.</p>
              )}
              <Link to="/book" className="btn btn-outline-primary mt-3">
                + Book new appointment
              </Link>
            </div>
          </div>

          <div className="col-md-6">
            <div className="bg-white p-4 rounded shadow-sm">
              <h4 className="fw-bold mb-3">Recent Prescriptions</h4>
              <PrescriptionList prescriptions={prescriptions} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PatientDashboard;
