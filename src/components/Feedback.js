import React, { useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import './css/feedback.css'; // Import the custom CSS file

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [urgency, setUrgency] = useState("Low");
  const [anonymous, setAnonymous] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare feedback data
    const feedbackData = {
      name: anonymous ? "Anonymous" : name,
      email: anonymous ? "" : email,
      phone: anonymous ? "" : phone,
      category,
      urgency,
      feedback
    };

    try {
      // Replace this with your actual API endpoint for feedback submission
      const response = await axios.post("/api/feedback", feedbackData);
      if (response.status === 200) {
        setMessage("Thank you for your feedback!");
        setFeedback(""); // Clear the feedback form
        setName(""); // Clear name field
        setEmail(""); // Clear email field
        setPhone(""); // Clear phone field
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setMessage("There was an error submitting your feedback. Please try again.");
    }
  };

  return (
    <div className="feedback-container">
      <Sidebar />
      <div className="form-container">
        <h3>Submit Feedback</h3>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <label htmlFor="name">Your Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={anonymous}
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Your Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={anonymous}
              placeholder="Enter your email"
            />
          </div>

          {/* Phone */}
          <div className="form-group">
            <label htmlFor="phone">Your Phone Number:</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={anonymous}
              placeholder="Enter your phone number"
            />
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="category">Category of Grievance:</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              <option value="Health">Health</option>
              <option value="Public Safety">Public Safety</option>
              <option value="Utility">Utility</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Urgency */}
          <div className="form-group">
            <label htmlFor="urgency">Urgency Level:</label>
            <select
              id="urgency"
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Feedback */}
          <div className="form-group">
            <label htmlFor="feedback">Your Feedback/Grievance:</label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows="5"
              required
            ></textarea>
          </div>

          {/* Anonymous Option */}
          <div className="checkbox-label">
            <input
              type="checkbox"
              id="anonymous"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
            />
            <label htmlFor="anonymous">Submit Anonymously</label>
          </div>

          {/* Submit Button */}
          <button type="submit">Submit Feedback</button>
        </form>
        
        {/* Success/Error Message */}
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Feedback;
