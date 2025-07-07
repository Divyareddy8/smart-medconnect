import React, { useEffect, useState } from 'react';
import { getMyAppointments, putPrescription } from '../../api/appointmentApi';
import PrescriptionForm from './PrescriptionForm';
import api from "../../api/axios"

const AppointmentTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [ prescriptionMedicine, setPrescriptionMedicine ] = useState([]);
  const [ selectedAppointmentId, setSelectedAppointmentId ] = useState("");
  const [ prescriptionDosage, setPrescriptionDosage ] = useState([]);
  const [ prescriptionDuration, setPrescriptionDuration ] = useState([]);
  const [ showPrescription, setShowPrescription ] = useState(false);
  const [filter, setFilter] = useState(['pending', 'confirmed']);
  console.log(appointments);

  const clickHandler = (appt_id, medicine, dosage, duration)=>
    {
    setPrescriptionDosage(dosage);
    setPrescriptionDuration(duration);
    setPrescriptionMedicine(medicine);
    setSelectedAppointmentId(appt_id);
    if (showPrescription === false) setShowPrescription(true);
    else if (appt_id === selectedAppointmentId) setShowPrescription(false);
    }
  
  const cancelAppointment = async (appt_id) => {
    try {
      // console.log(appt_id)
      const res = await api.post("/appointments/update/status", {
        appointmentId : appt_id,
        status: "cancelled"
      })
      setAppointments(appointments.map((a)=>{
        return a._id === appt_id ? res.data : a;
      }));
    }
    catch (e) {
      alert ('Failed to Cancel Appointment');
      console.log(e);
    }
  }

  const setAppointmentStat = async (appt_id, stat) => {
    try {
      // console.log(appt_id)
      const res = await api.post("/appointments/update/status", {
        appointmentId : appt_id,
        status: stat
      })
      setAppointments(appointments.map((a)=>{
        return a._id === appt_id ? res.data : a;
      }));
    }
    catch (e) {
      alert ('Failed to Cancel Appointment');
      console.log(e);
    }
  }

  const submitHandler = async (appt_id, medicine, dosage, duration) => {
  try {
    const medicines = medicine.map((_, index) => ({
      medicineName: medicine[index],
      dosage: dosage[index],
      duration: duration[index],
    }));

    // Send the update to backend
    const res = await putPrescription({ appointmentId: appt_id, medicines });

    // Update frontend state
    const updatedAppointments = appointments.map((appt) => {
      if (appt._id === appt_id) {
        return {
          ...appt,
          prescription: {
            ...appt.prescription,
            medicines,
          },
        };
      }
      return appt;
    });

    setAppointments(updatedAppointments);
    setShowPrescription(false);
  } catch (e) {
    alert("Error updating Prescription");
    console.error(e);
  }
};

  const changeHandler = (e) => {
    // e.preventDefault();
    console.log(e.target.value)
    if (filter.includes(e.target.value)) {
      setFilter(filter.filter((i)=>i != e.target.value))
    }
    else {
      let filter1 = [...filter];
      filter1.push(e.target.value);
      setFilter(filter1);
    }
  }


  useEffect(()=>{
    const setAppointmentsFxn = async () => {
      const res = await getMyAppointments();
      setAppointments(res.data);
    }
    setAppointmentsFxn()
  }, []);
  // console.log(appointments)
  return (
    <div className="overflow-x-auto">
      <form className="checkbox" >
        <div className='input'>
          <input type='checkbox' checked={filter.includes('pending')} onChange={changeHandler} value='pending'></input>
        <label>pending</label>
        </div>
        <div className='input'>
          <input type='checkbox' checked={filter.includes('confirmed')} onChange={changeHandler} value='confirmed'></input>
        <label>confirmed</label>
        </div>
        <div className='input'>
          <input type='checkbox' checked={filter.includes('cancelled')} onChange={changeHandler} value='cancelled'></input>
        <label>cancelled</label>
        </div>
        <div className='input'>
          <input type='checkbox' checked={filter.includes('completed')} onChange={changeHandler} value='completed'></input>
        <label>completed</label>
        </div>
      </form>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border">Patient</th>
            <th className="px-4 py-2 border">Time</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Prescription</th>
            <th className="px-4 py-2 border"></th>
          </tr>
        </thead>
        <tbody>
          {
            appointments.sort((a, b)=>{ //Sorting to ensure that most recent appointments are displayed first
              if (new Date(a.date) <= new Date(b.date)) return 1;
              else return -1;
            }).filter((app)=>{ 
              console.log(app)
              return filter.includes(app.status)
            }).map((appt) => {
            let medicine = [];
            let dosage = [];
            let duration = [];
            if (appt.prescription !== null && appt.prescription !== undefined){
              appt.prescription.medicines.map((m)=>{
                medicine.push(m.medicineName);
                dosage.push(m.dosage);
                duration.push(m.duration);
              })
            }
            return (
            <tr key={appt._id}>
              <td className="px-4 py-2 border">{appt.patient.name}</td>
              <td className="px-4 py-2 border">{appt.time}</td>
              <td className="px-4 py-2 border">{appt.date.substr(0,10)}</td>
              <td className="px-4 py-2 border">{appt.status}</td>
              <td className="px-4 py-2 border"><button className="btn-custom text-white px-4 py-2 rounded" onClick={()=>clickHandler(appt._id, medicine, dosage, duration)}>View Prescription</button></td>
              {
                appt.status === 'pending' ? <td className="px-4 py-2 border"><button className="btn-custom green text-white px-4 py-2 rounded" onClick={()=>setAppointmentStat(appt._id, "confirmed")}>Confirm</button></td> : (
                  appt.status === 'confirmed' ? <td className="px-4 py-2 border"><button className="btn-custom green text-white px-4 py-2 rounded" onClick={()=>setAppointmentStat(appt._id, "completed")}>Complete</button></td> : <td className="px-4 py-2 border"><button className="btn-custom green disabled text-white px-4 py-2 rounded">Complete</button></td>
                )
              }
              {
                appt.status !== 'cancelled' && appt.status !== 'completed' ? <td className="px-4 py-2 border"><button className="btn-custom cancel text-white px-4 py-2 rounded" onClick={()=>setAppointmentStat(appt._id, "cancelled")}>Cancel</button></td> : <td className="px-4 py-2 border"><button className="btn-custom cancel disabled text-white px-4 py-2 rounded">Cancel</button></td>
              }
            </tr>
            )
          })}
        </tbody>
      </table>
          {
            showPrescription === true ? <PrescriptionForm appt_id={selectedAppointmentId} medicine={prescriptionMedicine} dosage={prescriptionDosage} duration={prescriptionDuration} submitHandler={submitHandler}/> : null
          }
    </div>
  );
};

export default AppointmentTable;