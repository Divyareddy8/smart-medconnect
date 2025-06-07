import { useState } from "react";
import Button from "../components/Button";
import RegisterRole from "../components/RegisterRole";
import RegisterPatient from "../components/RegisterPatient";
import RegisterDoctor from "../components/RegisterDoctor";

export default function Register() {
  const [role, setRole] = useState(null);
  function clickHandler(r){
    setRole(r);
  }
  return (
    <div>
      {!role && <RegisterRole clickHandler={clickHandler}/>}
      {role==='patient'&&<RegisterPatient clickHandler={clickHandler} />}
      {role==='doctor'&&<RegisterDoctor clickHandler={clickHandler} />}
    </div>
  );
}
