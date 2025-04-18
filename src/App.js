import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/Home";
import Decrypt from "./pages/Decrypt";
import Retrieval from "./pages/Retrieval";

function App() {
  return (
    <Router>
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
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/decrypt" element={<Decrypt />} />
          <Route path="/retrieval" element={<Retrieval />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
