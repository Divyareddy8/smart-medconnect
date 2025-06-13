import React from 'react';
import AnalyticsCard from '../components/admin/AnalyticalCard';
import UserTable from '../components/admin/UserTable';
import Header from '../components/common/Header';

const AdminDashboard = () => {
  return (
    <div className="p-4">
      <Header />
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <AnalyticsCard />
      <UserTable />
    </div>
  );
};

export default AdminDashboard;