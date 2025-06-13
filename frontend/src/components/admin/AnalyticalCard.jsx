import React from 'react';

const AnalyticsCard = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 w-full">
      <h3 className="text-xl font-semibold mb-2">Analytics</h3>
      <p>Total Appointments Today: 42</p>
      <p>New Registrations: 18</p>
      <p>Revenue: ₹15,300</p>
    </div>
  );
};

export default AnalyticsCard;