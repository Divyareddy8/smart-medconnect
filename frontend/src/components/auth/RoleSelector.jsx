import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from './RegisterForm';

const RoleSelector = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = React.useState('');

  if (selectedRole) {
    return <RegisterForm role={selectedRole} />;
  }

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">Select Your Role</h2>
      <div className="grid grid-cols-2 gap-4">
        {['Patient', 'Doctor', 'Pharmacy', 'Admin'].map((role) => (
          <button
            key={role}
            onClick={() => setSelectedRole(role.toLowerCase())}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
          >
            {role}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;
