import React, { useState, useEffect } from 'react';

const PrescriptionForm = ({appt_id, medicine, dosage, duration, submitHandler}) => {
  const [form, setForm] = useState({ medicine, dosage, duration });
  useEffect(() => {
  setForm({ medicine, dosage, duration });
}, [medicine, dosage, duration]);


  const handleChange = (e, index) => {
    let arr = [];
    if (e.target.name === "medicine") arr = [...(form.medicine)];
    else if (e.target.name === "dosage") arr = [...(form.dosage)];
    else arr = [...(form.duration)];
    arr[index] = e.target.value;
    // console.log(arr);
    setForm({ ...form, [e.target.name]: arr });
  };

  const removeRow = (index) => {
    let temp = {...form};
    temp.medicine = form.medicine.filter((_, idx)=>idx != index);
    temp.dosage = form.dosage.filter((_, idx)=>idx != index);
    temp.duration = form.duration.filter((_, idx)=>idx != index);
    setForm(temp);
  }

  return (
    <form onSubmit={(e)=>{
        e.preventDefault();
        submitHandler(appt_id, form.medicine, form.dosage, form.duration)
      }} className="bg-white p-4 rounded shadow-md w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Issue Prescription</h3>
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">Medicine</th>
              <th className="px-4 py-2 border">Dosage</th>
              <th className="px-4 py-2 border">duration</th>
              <th className="px-4 py-2"></th> 
            </tr>
          </thead>
          <tbody>
            {
              form.medicine.map((name, index)=>(
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      name="medicine"
                      value={form.medicine[index]}
                      onChange={(e)=>handleChange(e, index)}
                      placeholder="Medicine"
                      className="border p-2 w-full mb-2"
                      required
                    />
                  </td>
                  <td>
                  <input
                    type="text"
                    name="dosage"
                    value={form.dosage[index]}
                    onChange={(e)=>handleChange(e, index)}
                    placeholder="Dosage"
                    className="border p-2 w-full mb-2"
                    required
                  />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="duration"
                      value={form.duration[index]}
                      onChange={(e)=>handleChange(e, index)}
                      placeholder="Duration"
                      className="border p-2 w-full mb-2"
                      required
                    />
                  </td>
                  <td>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded mb-2" onClick={(e)=>{
                      e.preventDefault()
                      removeRow(index)
                    }
                  }>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={(e) => {
  e.preventDefault();
  setForm(prevForm => ({
    medicine: [...prevForm.medicine, ""],
    dosage: [...prevForm.dosage, ""],
    duration: [...prevForm.duration, ""],
  }));
}}>Add Row</button> <br /><br />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded ml-5">Update</button>
    </form>
  );
};

export default PrescriptionForm;