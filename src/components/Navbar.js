import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg p-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Secure Chain</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/decrypt">Decrypt</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/retrieval">Retrieval</Link></li>
            <li className="nav-item"><button className="btn btn-danger" onClick={handleLogout}>Logout</button></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
