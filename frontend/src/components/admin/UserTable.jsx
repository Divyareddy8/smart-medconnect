import React from 'react';

const UserTable = () => {
  const users = [
    { name: 'Alice', role: 'Patient' },
    { name: 'Dr. Bob', role: 'Doctor' },
    { name: 'Charlie', role: 'Pharmacy' }
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-md shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left py-2 px-4">Name</th>
            <th className="text-left py-2 px-4">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="border-t">
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;