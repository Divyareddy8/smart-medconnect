import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import OrderList from '../components/pharmacy/OrderList';
import MedicineCard from '../components/pharmacy/MedicineCard';

const PharmacyDashboard = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 container py-4">
        <h2 className="mb-4 display-6 fw-bold text-danger">Pharmacy Dashboard</h2>
        <OrderList />
        <MedicineCard />
      </main>
      <Footer />
    </div>
  );
};

export default PharmacyDashboard;
