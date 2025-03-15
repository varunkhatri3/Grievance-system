import React, { useState } from "react";
import "./css/LandingPage.css"; // Import the CSS file for styling
import Chatbot from "./ChatBot";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Shield,
  MessageSquare,
  Activity,
} from "lucide-react";
import axios from "axios";
import Login from "./Login"; // Import the login component

const GovernmentLoginPage = () => {
  const [showLogin, setShowLogin] = useState(false); // State for showing/hiding login form

  const toggleLogin = () => {
    setShowLogin(!showLogin); // Toggle login popup visibility
  };
  const [showRegister, setShowRegister] = useState(false); // State for showing/hiding login form

  const toggleRegister = () => {
    setShowRegister(!showRegister); // Toggle login popup visibility
  };
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
          },
        }
      );
      // console.log(response.data);
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <main>
        <div className="login-box">
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
              <div className="block-1">
                <label htmlFor="pincode">Pincode</label>
                <input
                  type="number"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="block-2">
                <label htmlFor="street">Street</label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
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
          {showLogin && (
            <div className="login-popup">
              <div className="popup-overlay" onClick={toggleLogin}></div>{" "}
              {/* Overlay to close popup */}
              <div className="popup-content">
                <Login />
              </div>
            </div>
          )}
        </div>
      </main>
      <div className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-600 to-blue-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">
                Grievance Redressal System
              </h1>
              <p className="text-xl text-blue-100">
                Empowering Citizens, Enhancing Transparency
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Challenges Section */}
          <section className="bg-white rounded-lg shadow-md p-6 mb-12">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                <AlertCircle className="mr-2 text-red-500" />
                Current Challenges
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Lack of Awareness",
                  desc: "Many people are unaware of GRS or its processes",
                },
                {
                  title: "Complex Procedures",
                  desc: "Filing grievances is often tedious and discouraging",
                },
                {
                  title: "Bureaucratic Delays",
                  desc: "Prolonged resolutions due to red tape",
                },
                {
                  title: "Lack of Transparency",
                  desc: "Processes are unclear, eroding trust",
                },
                {
                  title: "Ineffective Follow-up",
                  desc: "No proper follow-ups create a sense of neglect",
                },
                {
                  title: "Fear of Retaliation",
                  desc: "Concerns about consequences deter users",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <h3 className="font-semibold text-lg mb-2 text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Features Section */}
          <section className="bg-white rounded-lg shadow-md p-6 mb-12">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                <CheckCircle2 className="mr-2 text-green-500" />
                Enhanced Features
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* AI-Powered Features */}
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <h3 className="text-xl font-semibold mb-4 text-blue-800">
                    AI-Powered Complaint Categorization
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Activity className="mt-1 mr-2 text-blue-600 h-5 w-5" />
                      <span>Faster resolution through intelligent routing</span>
                    </li>
                    <li className="flex items-start">
                      <Activity className="mt-1 mr-2 text-blue-600 h-5 w-5" />
                      <span>Improved accuracy in identifying issues</span>
                    </li>
                    <li className="flex items-start">
                      <Activity className="mt-1 mr-2 text-blue-600 h-5 w-5" />
                      <span>Data-driven insights for proactive solutions</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                  <h3 className="text-xl font-semibold mb-4 text-green-800">
                    Multilingual AI Chatbot
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <MessageSquare className="mt-1 mr-2 text-green-600 h-5 w-5" />
                      <span>24/7 support in multiple languages</span>
                    </li>
                    <li className="flex items-start">
                      <MessageSquare className="mt-1 mr-2 text-green-600 h-5 w-5" />
                      <span>Personalized assistance for each user</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Implementation Features */}
              <div className="space-y-6">
                <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                  <h3 className="text-xl font-semibold mb-4 text-purple-800">
                    Real-Time Tracking
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Clock className="mt-1 mr-2 text-purple-600 h-5 w-5" />
                      <span>Live status updates for complaints</span>
                    </li>
                    <li className="flex items-start">
                      <Clock className="mt-1 mr-2 text-purple-600 h-5 w-5" />
                      <span>Transparent communication channels</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg border border-orange-100">
                  <h3 className="text-xl font-semibold mb-4 text-orange-800">
                    Security & Privacy
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Shield className="mt-1 mr-2 text-orange-600 h-5 w-5" />
                      <span>End-to-end data encryption</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="mt-1 mr-2 text-orange-600 h-5 w-5" />
                      <span>Compliant with data protection regulations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Chatbot />
      <footer>
        <ul>
          <li>
            <a href="#">Privacy Policy</a>
          </li>
          <li>
            <a href="#">Terms of Service</a>
          </li>
          <li>
            <a href="#">Contact Support</a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default GovernmentLoginPage;
