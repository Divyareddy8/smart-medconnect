import React, { useState } from "react";
import SpecializationSelector from "./SpecializationSelector";
import axios from "../../api/axios";

const BookAppointmentForm = () => {
  const [selectedSpec, setSelectedSpec] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSpecChange = async (spec) => {
    setSelectedSpec(spec);
    try {
      const res = await axios.get(`/auth/doctors?specialization=${spec}`);
      setDoctors(res.data);
    } catch (err) {
      console.error("Failed to fetch doctors", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/appointments", {
        doctorId: selectedDoctor,
        date,
        time,
      });
      alert("Appointment Booked!");
    } catch (err) {
      alert("Booking failed");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: '500px' }}>
        <h3 className="text-primary mb-3">Book Appointment</h3>
        <SpecializationSelector onSelect={handleSpecChange} />

        {selectedSpec && (
          <form onSubmit={handleSubmit}>
            <div className="form-group my-3">
              <label>Select Doctor:</label>
              <select
                className="form-select"
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                required
              >
                <option value="">-- Select --</option>
                {doctors.map((doc) => (
                  <option key={doc._id} value={doc._id}>
                    {doc.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group mb-3">
              <label>Date:</label>
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group mb-4">
              <label>Time:</label>
              <input
                type="time"
                className="form-control"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-100"
              style={{
                backgroundColor: 'rgba(0, 0, 255, 0.448)',
                color: 'white',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Book Appointment
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookAppointmentForm;
