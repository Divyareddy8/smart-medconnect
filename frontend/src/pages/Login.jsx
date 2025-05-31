import { useState } from "react";
import { useNavigate } from "react-router-dom";

const dbApi = "http://localhost:5050/api/auth/login";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.role != "patient" &&
      formData.role != "doctor" &&
      formData.role != "admin"
    )
      alert("Invalid role");
    try {
      const res = await fetch(dbApi, {
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

        // ✅ Navigate based on role
        if (formData.role === "patient") navigate("/patient/home");
        else if (formData.role === "doctor") navigate("/doctor/home");
        else if (formData.role === "admin") navigate("/admin/home");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Welcome to MediCare!</h1>
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

        <label>Role:</label>
        <br />
        <input type="role" name="role" onChange={handleChange} required />
        <br />
        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
