import React, { useState } from "react";
import { retrieveFile } from "../api";

const Retrieval = () => {
  const [cid, setCid] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleRetrieve = () => {
    if (!cid) return alert("Enter a valid CID.");
    setFileUrl(`https://gateway.pinata.cloud/ipfs/${cid}`);
  };

  return (
    <div className="container">
      <h2>Retrieve File</h2>
      <input type="text" className="form-control" placeholder="Enter CID" onChange={(e) => setCid(e.target.value)} />
      <button className="btn btn-primary mt-2" onClick={handleRetrieve}>Retrieve</button>
      
      {fileUrl && (
  <div>
    <h4>File:</h4>
      <a href={fileUrl} target="_blank" rel="noopener noreferrer">
        File
      </a>
  </div>
)}
    </div>
  );
};

export default Retrieval;
