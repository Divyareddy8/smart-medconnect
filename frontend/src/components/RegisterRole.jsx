import React from 'react'
import "./RegisterRole.css";

const RegisterRole = ({clickHandler}) => {
  return (
    <div className="selectRole">
        <h1>Register as:</h1>
        <a id='patient'><div className='role' onClick={()=>clickHandler('patient')}>Patient</div></a>
        <a id='doctor'><div className='role'onClick={()=>clickHandler('doctor')}>Doctor</div></a>
    </div>
  )
}

export default RegisterRole;