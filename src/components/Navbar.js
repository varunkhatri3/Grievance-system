import React from "react";
import { Link } from "react-router-dom";
import "./css/navbar.css";
import logo from "./logo.png";
import "./css/LandingPage.css";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg">
    <div className="container">
      <img src={logo} alt="Logo" className="logo" />
      <Link className="navbar-brand" to="/">PGS</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          {/* <li className="nav_item"><Link classNa  me="nav-link" to="/complains">Complains</Link></li> */}
          <li className="nav_item"><Link className="nav-link" to="/login">Login</Link></li>
          <li className="nav_item"><Link className="nav-link" to="/register">Register</Link></li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
