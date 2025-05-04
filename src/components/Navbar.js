import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../pages/Login";

const Navbar = ({ setUser }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg p-3">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/home">
                <div className="brand">
                  <div className="brandLogo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="url(#greenGradient)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock text-emerald-400 h-6 w-6 animate-pulse-subtle">
                      <defs>
                        <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stop-color="#79C96C" />
                          <stop offset="50%" stop-color="#fff" />
                          <stop offset="100%" stop-color="#009579" />
                        </linearGradient>
                      </defs>
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <h2 className="bName"><span className="brandSpan">Secure</span> Chain <span className="brandSpan2">Storage</span></h2>
                </div>
              </Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/home">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/decrypt">Decrypt</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/retrieval">Retrieve</Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-danger" onClick={() => { signOut(navigate); }}>Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
  );
};

export default Navbar;
