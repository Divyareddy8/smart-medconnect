import { useState } from 'react'
import './App.css'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import About from './pages/About'
import Contact from './pages/Contact'
import Doctors from './pages/Doctors'
import Pharmacy from './pages/Pharmacy'
import PatientProfile from './pages/PatientProfile'
import PatientHome from './pages/PatientHome'
import DoctorHome from './pages/DoctorHome'
import DoctorProfile from './pages/DoctorProfile'
import AdminProfile from './pages/AdminProfile'
import AdminHome from './pages/AdminHome'
import BookAppointment from './pages/BookAppointment'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/login" element = {<Login />} />
        <Route path = "/register" element = {<Register />} />
        <Route path = "/about" element = {<About />} />
        <Route path = "/contact" element = {<Contact />} />
        <Route path = "/doctors" element = {<Doctors />} />
        <Route path = "/pharmacy" element = {<Pharmacy />} />
        <Route path = "/patient/profile" element = {<PatientProfile />} />
        <Route path = "/patient/home" element = {<PatientHome />} />
        <Route path = "/patient/bookappointment" element = {<BookAppointment />} />
        <Route path = "/doctor/home" element = {<DoctorHome />} />
        <Route path = "/doctor/profile" element = {<DoctorProfile />} />
        <Route path = "/admin/profile" element = {<AdminProfile />} />
        <Route path = "/admin/home" element = {<AdminHome />} />
      </Routes>
    </div>
  );
}

export default App
