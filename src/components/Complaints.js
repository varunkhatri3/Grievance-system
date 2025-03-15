import React, { useState } from 'react';
import axios from 'axios';

const ComplaintForm = () => {
  const [complaint, setComplaint] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://127.0.0.1:5000/analyze_complaint', {
        complaint: complaint,
      });
      setResponse(result.data);
      setError(null); // Reset error if request is successful
    } catch (err) {
      setError('Failed to analyze the complaint. Please try again.');
      setResponse(null); // Reset response if there’s an error
    }
  };

  return (
    <div>
      <h1>Complaint Analysis</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          placeholder="Enter your complaint"
          rows="5"
          cols="50"
        />
        <button type="submit">Submit Complaint</button>
      </form>

      {response && (
        <div>
          <h2>Complaint Analysis Result</h2>
          <p><strong>Category:</strong> {response.category}</p>
          <p><strong>Sub-category:</strong> {response['sub-category']}</p>
          <p><strong>Sentiment:</strong> {response.sentiment}</p>
          <p><strong>Entities:</strong> {response.entities.join(', ')}</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ComplaintForm;