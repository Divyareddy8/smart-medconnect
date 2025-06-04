import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const getOwnAppointmentsApi = "http://localhost:5050/api/appointments/self";
const getFreeDoctorsApi = "http://localhost:5050/api/availability/get";
const getAllDoctorsApi = "http://localhost:5050/api/doctors";
const bookAppointmentApi = "http://localhost:5050/api/appointments/book";
const defaultAppointmentDisplayLen = 3;

async function fetchOwnAppointments() {
  const token = localStorage.getItem("token");

  const res = await fetch(getOwnAppointmentsApi, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
}

async function fetchAllDoctors() {
  const token = localStorage.getItem("token");

  const res = await fetch(getAllDoctorsApi, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
}


const BookAppointment = () => {
  const [appointments, setAppointments] = useState([]);

  const [availableDoctors, setAvailableDoctors] = useState([]);

  const [showAllAppointment, setShowAllAppointment] = useState(false);

  const [dateProvided, setDateProvided] = useState(false);
  // const [showAllButtonContent, setShowAllButtonContent] = useState("Show All");
  let showAllButtonContent = 'Show All';
  if (showAllAppointment == true) showAllButtonContent = 'Show Less';

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await fetchOwnAppointments();
        setAppointments(data);
      } catch (err) {
        console.error("Error loading appointments:", err);
      }
    };

    const loadAvailableDoctors = async ()=> {
      try {
        const data = await fetchAllDoctors();
        setAvailableDoctors(data);
      } catch (err) {
        console.error("Error loading appointments:", err);
      }
    }

    loadAppointments();
    loadAvailableDoctors();
  }, []);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(getFreeDoctorsApi + `?date=${formData.date}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Error occurred");
      } else {
        console.log(data);
        setDateProvided(true);
        setAvailableDoctors(data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  console.log(dateProvided);

  async function bookAppointment({ doctorId, date, time }) {
    const token = localStorage.getItem("token");

    const res = await fetch(bookAppointmentApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        doctorId,
        date,
        time,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error(data);
      alert(data.message || "Booking failed");
      return;
    }

    // Set the new appointment correctly
    setAppointments((prev) => [...prev, data.appointment]);

  }

  return (
    <div>
      <h2>Book Appointment</h2>
      <div>
        <h3>Past Appointments:</h3>
        <ul>
          {appointments.map((apt, index) => {
            if (showAllAppointment == true || index < defaultAppointmentDisplayLen) 
            return(
            <li key={index}>
              <div>Doctor name: {apt.doctor.name}</div>
              <div>Date: {apt.date.slice(0, 10)}</div>
              <div>Time: {apt.time}</div>
              <div>Status: {apt.status}</div>
            </li>)
          })}
        </ul>
        <button onClick={() =>{
          setShowAllAppointment(!showAllAppointment);
        }}>{showAllButtonContent}</button>
      </div>

      <form onSubmit={handleSubmit}>
        <label>Date:</label>
        <br />
        <input type="date" name="date" onChange={handleChange} required />
        <br />
        <br />
        <button type="submit">Search Availabile Doctors</button>
      </form>

      <div>
        <h2>Available doctors:</h2>
        <ul>
          {
          availableDoctors.map((item, index) => {
            if (dateProvided)
            return (
              <li key={index}>
                <div>Doctor name: {item.doctor?.name || "N/A"}</div>

                <div>
                  {item.timeSlots.map((time, i) => (
                    <button
                      key={i}
                      onClick={() =>
                        bookAppointment({
                          doctorId: item.doctor._id,
                          date: item.date,
                          time,
                        })
                      }
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </li>
            );
            else return (
                <li key={index}>{item.name}</li>

            )
          })}
        </ul>
      </div>
    </div>
  );
};

export default BookAppointment;
