import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/Home";
import Decrypt from "./pages/Decrypt";
import Retrieval from "./pages/Retrieval";
import Login from "./pages/Login";
import { signOut } from "./pages/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Set to true if token exists, false otherwise
  }, []);

  return (
    <Router>
      {isAuthenticated ? (
        <div className="container mt-4">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg p-3">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">Secure File Storage</Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/decrypt">Decrypt</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/retrieval">Retrieve</Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-danger" onClick={() => { signOut(); setIsAuthenticated(false); }}>Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/decrypt" element={<Decrypt />} />
            <Route path="/retrieval" element={<Retrieval />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;