import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js"; // 🔥 Explicitly add .js
import reportWebVitals from "./reportWebVitals.js"; // 🔥 Explicitly add .js

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
