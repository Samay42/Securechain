import React, { useState } from "react";
import axios from "axios";
import { uploadFile, generateKey, encryptCID } from "../api";

const Home = () => {
  const [file, setFile] = useState(null);
  const [key, setKey] = useState("");
  const [encryptedCid, setEncryptedCid] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle File Selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Upload File & Encrypt CID
  const handleUploadAndEncrypt = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Upload file to backend
      const uploadResponse = await uploadFile(formData);

      if (!uploadResponse.success) {
        alert("Upload failed: " + uploadResponse.error);
        setLoading(false);
        return;
      }

      // Generate Encryption Key
      const keyResponse = await generateKey();
      if (!keyResponse.success) {
        alert("Key generation failed: " + keyResponse.error);
        setLoading(false);
        return;
      }
      const generatedKey = keyResponse.key;
      setKey(generatedKey);
      // Encrypt CID

      const cid = uploadResponse.ipfsHash;
      const encryptResponse = await encryptCID(cid, generatedKey);

      if (encryptResponse.success) {
        setEncryptedCid(encryptResponse.encryptedCID);
        alert("File uploaded and encrypted successfully!");
      } else {
        alert("Encryption failed: " + encryptResponse.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Upload & Encrypt Your File</h2>

      {/* File Upload */}
      <div className="mb-3">
        <input type="file" onChange={handleFileChange} className="form-control" />
      </div>
      <button className="btn btn-primary" onClick={handleUploadAndEncrypt} disabled={loading}>
        {loading ? "Processing..." : "Upload & Encrypt"}
      </button>

      {/* Display Generated Encryption Key */}
      {key && (
        <div className="mt-3">
          <strong>Generated Encryption Key:</strong> {key}
        </div>
      )}

      {/* Display Encrypted CID */}
      {encryptedCid && (
        <div className="mt-3">
          <strong>Encrypted CID:</strong> {encryptedCid}
        </div>
      )}
    </div>
  );
};

export default Home;
