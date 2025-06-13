import React from 'react';
import OrderList from '../components/pharmacy/OrderList';
import MedicineCard from '../components/pharmacy/MedicineCard';
import Header from '../components/common/Header';

const PharmacyDashboard = () => {
  return (
    <div className="p-4">
      <Header />
      <h2 className="text-2xl font-bold mb-4">Pharmacy Dashboard</h2>
      <OrderList />
      <MedicineCard />
    </div>
  );
};

export default PharmacyDashboard;
