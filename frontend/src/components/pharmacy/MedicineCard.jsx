import React from 'react';

const MedicineCard = ({ name, stock, price }) => {
  return (
    <div className="border p-4 rounded shadow-sm bg-white w-full sm:w-60">
      <h4 className="text-xl font-bold">{name}</h4>
      <p className="text-gray-600">Stock: {stock}</p>
      <p className="text-gray-800 font-semibold">₹{price}</p>
      <button className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Update</button>
    </div>
  );
};

export default MedicineCard;
