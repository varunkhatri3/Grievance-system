import React from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaClipboardList, FaCog, FaInfoCircle, FaRegPaperPlane, FaRegCommentDots } from 'react-icons/fa'; // Import icons from react-icons/fa
import "./css/sidebar.css";

function Sidebar() {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <Link to="/dashboard">
            <FaTachometerAlt /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/status">
            <FaClipboardList /> Status
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <FaCog /> Settings
          </Link>
        </li>
        <li>
          <Link to="/about">
            <FaInfoCircle /> About
          </Link>
        </li>
        <li>
          <Link to="/my-queries">
            <FaRegPaperPlane /> Submit Queries
          </Link>
        </li>
        <li>
          <Link to="/feedback">
            <FaRegCommentDots /> Feedback
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
