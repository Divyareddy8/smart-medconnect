import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', appointments: 10 },
  { name: 'Tue', appointments: 14 },
  { name: 'Wed', appointments: 12 },
  { name: 'Thu', appointments: 20 },
  { name: 'Fri', appointments: 18 }
];

const ChartDisplay = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 w-full">
      <h3 className="text-xl font-semibold mb-4">Appointments Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="appointments" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartDisplay;