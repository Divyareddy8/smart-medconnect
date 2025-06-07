import React from "react";
import { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const RegisterDoctor = ({ clickHandler }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "doctor",
    defaultTimeSlots: [],
    consultaionFee: 0,
  });

  const navigate = useNavigate();

  function generateTimeSlots(interval = 30) {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const h = hour.toString().padStart(2, "0");
        const m = minute.toString().padStart(2, "0");
        times.push(`${h}:${m}`);
      }
    }
    return times;
  }
  const timeSlots = generateTimeSlots();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 5)
      alert("Password length cannot be less than 5");
    try {
      const res = await fetch("http://localhost:5050/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Error occurred");
      } else {
        // ✅ Save token to localStorage
        localStorage.setItem("token", data.token);

        navigate("/doctor/home");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={() => clickHandler(null)}>Back</button>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <br />
        <input type="name" name="name" onChange={handleChange} required />
        <br />
        <br />

        <label>Email:</label>
        <br />
        <input type="email" name="email" onChange={handleChange} required />
        <br />
        <br />

        <label>Password:</label>
        <br />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label>Specialization:</label>
        <br />
        <input type="text" name="specialization" onChange={handleChange} />
        <br />
        <br />
        <div className="buttonGroup">
          {timeSlots.map((item, index) => {
            const isactive = formData.defaultTimeSlots.includes(item)
              ? true
              : false;
            return (
              <Button
                clicked={isactive}
                key={index}
                clickHandler={(e) => {
                  if (e) e.preventDefault();
                  const f = () => {
                    if (formData.defaultTimeSlots.includes(item)) {
                      const temp = formData.defaultTimeSlots.filter(
                        (x) => x != item
                      );
                      setFormData({ ...formData, defaultTimeSlots: temp });
                    } else {
                      const temp = [...formData.defaultTimeSlots, item];
                      setFormData({ ...formData, defaultTimeSlots: temp });
                    }
                  };
                  f(item);
                }}
                content={item}
              />
            );
          })}
        </div>
        <br />
        <br />
        <label>Consultation Fee</label>
        <br />
        <input type="number" name="consultationFee" onChange={handleChange} />
        <br />
        <br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterDoctor;
