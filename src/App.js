import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthContext, { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from "./components/LandingPage";
import Settings from "./components/Settings";
import About from "./components/About";
import Status from "./components/Status";
import MyQueries from "./components/MyQueries";
import Feedback from "./components/Feedback";


// PrivateRoute using new structure in React Router v6
const PrivateRoute = () => {
  const { user } = useContext(AuthContext);
  return user ? <AuthProvider><Dashboard /></AuthProvider> : <Login />;
};

const App = () => (
  <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> {/* Updated Route with 'element' */}
        <Route path="/dashboard" element={<PrivateRoute/>} /> {/* Updated PrivateRoute */}
        <Route path="/settings" element={<Settings/>} /> {/* Updated PrivateRoute */}
        <Route path="/about" element={<About/>} /> {/* Updated PrivateRoute */}
        <Route path="/status" element={<Status/>} /> {/* Updated PrivateRoute */}
        <Route path="/my-queries" element={<MyQueries/>} /> {/* Updated PrivateRoute */}
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;