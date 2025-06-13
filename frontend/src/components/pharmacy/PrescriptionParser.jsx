import React, { useState } from 'react';

const PrescriptionParser = () => {
  const [file, setFile] = useState(null);
  const [parsedText, setParsedText] = useState('');

  const handleUpload = async () => {
    if (!file) return;

    // Simulated OCR response
    setParsedText('Take 1 tablet of Paracetamol 3 times a day after meals.');
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h3 className="text-lg font-semibold mb-2">Prescription OCR</h3>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Parse Prescription
      </button>
      {parsedText && (
        <p className="mt-4 bg-gray-100 p-2 rounded text-gray-700">{parsedText}</p>
      )}
    </div>
  );
};

export default PrescriptionParser;
