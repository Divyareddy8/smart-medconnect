import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPatient = ({ clickHandler }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
    defaultTimeSlots: [],
    consultaionFee: 0,
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 5) {
      alert("Password length cannot be less than 5");
      return;
    }

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

        navigate("/patient/home");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="register">
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

        <button className="submitButton" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPatient;
