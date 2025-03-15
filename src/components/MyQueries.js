import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./css/submitquery.css";

const MyQueries = () => {
  const [queries, setQueries] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    contact: "",
    pincode: "",
    state: "",
    street: "",
    address: "",
    complaint: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Simulate API call to fetch the user's queries
    const fetchQueries = async () => {
      try {
        // Replace this with your actual API endpoint
        const response = await axios.get("/api/queries"); 
        setQueries(response.data);
      } catch (error) {
        console.error("Error fetching queries:", error);
      }
    };

    fetchQueries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/complain/complain",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      // console.log(response.data);
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container">
        <Sidebar/>
        <div className="login-box-logged-in">
          <h2>Register a Complain</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-field block">
              <label htmlFor="username">Name</label>
              <label htmlFor="contact">Contact</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field block">
              <label htmlFor="pincode">Pincode</label>
              <label htmlFor="state">State</label>
              <input
                type="number"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field block">
              <label htmlFor="street">Street</label>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="complaint">Query</label>
              <textarea
                id="complaint"
                name="complaint"
                value={formData.complaint}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
    </div>
  );
};

export default MyQueries;
