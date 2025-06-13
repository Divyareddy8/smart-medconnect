import React, { useEffect, useState } from 'react';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Replace with actual API call
    setOrders([
      { id: 1, patient: 'Divya', medicine: 'Paracetamol', status: 'Pending' },
      { id: 2, patient: 'Rahul', medicine: 'Ibuprofen', status: 'Shipped' },
    ]);
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h3 className="text-lg font-semibold mb-2">Orders</h3>
      <ul className="divide-y">
        {orders.map((order) => (
          <li key={order.id} className="py-2 flex justify-between">
            <span>{order.patient} - {order.medicine}</span>
            <span className={`font-semibold ${order.status === 'Pending' ? 'text-yellow-600' : 'text-green-600'}`}>
              {order.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
