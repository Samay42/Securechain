import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/Home";
import Decrypt from "./pages/Decrypt";
import Retrieval from "./pages/Retrieval";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    console.log('Token:', isAuthenticated);
  }, [setIsAuthenticated, isAuthenticated]);

  return (
    <Router>
      {isAuthenticated ? (
        <div className="container mt-4">
          <Navbar setUser={setIsAuthenticated} />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/decrypt" element={<Decrypt />} />
            <Route path="/retrieval" element={<Retrieval />} />
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