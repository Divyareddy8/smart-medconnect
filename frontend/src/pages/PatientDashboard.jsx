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
  const [prescriptions, setPrescriptions] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apptRes = await getMyAppointments();
        setAppointments(apptRes.data);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      }
    };

    fetchData();
  }, []);

  const prescriptionLoader = (prescription)=>{
    setPrescriptions(prescription);
  }

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Header />
      <main className="flex-grow-1 container py-4">
        <h2 className="mb-4 display-6 fw-semibold">Welcome !👋</h2>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="bg-white p-4 rounded shadow-sm">
              <Link to="/book" className="btn btn-outline-primary mb-3">
                + Book new appointment
              </Link>
              <h4 className="fw-bold mb-3">Your Upcoming Appointments</h4>
              {appointments.length ? (
                appointments.sort((a, b)=>{
                  if (new Date(a.date) > new Date(b.date)) return -1;
                  return 1;
                }).map((appt) => (
                  <AppointmentCard key={appt._id} appointment={appt} prescriptionLoader={prescriptionLoader} />
                ))
              ) : (
                <p>No upcoming appointments.</p>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="bg-white p-4 rounded shadow-sm">
              {/* <h4 className="fw-bold mb-3">Prescriptions</h4> */}
              <PrescriptionList prescription={prescriptions} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PatientDashboard;
