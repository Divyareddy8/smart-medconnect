import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import AnalyticsCard from '../components/admin/AnalyticalCard';
import UserTable from '../components/admin/UserTable';

const AdminDashboard = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 container py-4">
        <h2 className="mb-4 display-6 fw-bold text-primary">Admin Dashboard</h2>
        <AnalyticsCard />
        <UserTable />
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
