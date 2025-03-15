import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Chatbot from "./ChatBot";
import Sidebar from "./Sidebar";
import "./css/dashboard.css";
import axios from "axios";

const Dashboard = () => {
  const [grievances, setGrievances] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch grievances from back-end
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/complain/user-complaints"
        );
        setGrievances(response.data);
      } catch (err) {
        setError("Failed to load grievances. Please try again later.");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />

      
      <h1 style={styles.header}>Grievance Resolution Workflow</h1>
      {error ? (
        <p style={styles.error}>{error}</p>
      ) : grievances.length > 0 ? (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Grievance ID</th>
                <th style={styles.th}>Username</th>
                <th style={styles.th}>Complaint</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Sentiment</th>
                <th style={styles.th}>Entities</th>
              </tr>
            </thead>
            <tbody>
              {grievances.map((grievance) => (
                <tr key={grievance._id} style={styles.row}>
                  <td style={styles.td}>{grievance._id}</td>
                  <td style={styles.td}>{grievance.username}</td>
                  <td style={styles.td}>{grievance.complaint}</td>
                  <td style={styles.td}>{grievance.category}</td>
                  <td style={styles.td}>{grievance.sentiment}</td>
                  <td style={styles.td}>
                    {Array.isArray(grievance.entities)
                      ? grievance.entities.join(", ")
                      : "No entities"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No grievances found.</p>
      )}
    </div>
  );
};


const styles = {
  container: {
    marginLeft: "280px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f7fa",
    minHeight: "100vh",
  },
  header: {
    fontSize: "2rem",
    color: "#003366",
    marginBottom: "20px",
    textAlign: "center",
  },
  error: {
    color: "red",
    textAlign: "center",
    fontSize: "1.2rem",
  },
  tableContainer: {
    width: "80%",
    marginTop: "30px",
    overflowX: "auto",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    padding: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    borderRadius: "8px",
    overflow: "hidden",
    textAlign: "left",
  },
  th: {
    backgroundColor: "#003366",
    color: "#fff",
    padding: "12px 15px",
    fontSize: "1.1rem",
  },
  td: {
    padding: "12px 15px",
    fontSize: "1rem",
    borderBottom: "1px solid #ddd",
  },
  row: {
    transition: "background-color 0.3s ease",
  },
  rowHover: {
    backgroundColor: "#f1f1f1",
  },
  tableContainer: {
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    overflow: "hidden",
  },
};

export default Dashboard;
