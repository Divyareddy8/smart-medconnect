import React, { useState } from 'react';
import RegisterForm from './RegisterForm';

const RoleSelector = () => {
  const [selectedRole, setSelectedRole] = useState('');

  if (selectedRole) {
    return <RegisterForm role={selectedRole} />;
  }

  return (
    <div className="vh-100 vw-100 d-flex align-items-center justify-content-center bg-info text-white m-0 p-0">
      <div className="text-center w-100" style={{ maxWidth: '500px' }}>
        <h3 className="mb-4">Select Your Role</h3>
        <div className="row justify-content-center">
          {['Patient', 'Doctor'].map((role) => (
            <div key={role} className="col-6 col-md-3 mb-3">
              <button
                className="btn btn-light w-100 text-dark fw-semibold"
                onClick={() => setSelectedRole(role.toLowerCase())}
              >
                {role}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;
