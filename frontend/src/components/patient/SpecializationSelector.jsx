import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const SpecializationSelector = ({ onSelect }) => {
  const [specializations, setSpecializations] = useState([]);

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const res = await axios.get("auth/specializations");
        setSpecializations(res.data);
      } catch (error) {
        console.error("Failed to fetch specializations:", error);
      }
    };
    fetchSpecializations();
  }, []);

  return (
    <div className="form-group">
      <label className="form-label">Select Specialization:</label>
      <select className="form-select" onChange={(e) => onSelect(e.target.value)} required>
        <option value="">-- Select --</option>
        {specializations.map((spec, index) => (
          <option key={index} value={spec}>
            {spec}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SpecializationSelector;
