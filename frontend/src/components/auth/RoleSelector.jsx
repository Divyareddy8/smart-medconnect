import React from 'react';
import RegisterForm from './RegisterForm';

const RoleSelector = () => {
  const [selectedRole, setSelectedRole] = React.useState('');

  if (selectedRole) {
    return <RegisterForm role={selectedRole} />;
  }

  return (
    <div className="d-flex flex-column min-vh-100 bg-info text-white">
      <main className="flex-grow-1 d-flex align-items-center justify-content-center px-3">
        <div className="text-center w-100" style={{ maxWidth: '500px' }}>
          <h3 className="mb-4">Select Your Role</h3>
          <div className="row justify-content-center">
            {['Patient', 'Doctor', 'Pharmacy', 'Admin'].map((role) => (
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
      </main>
    </div>
  );
};

export default RoleSelector;
