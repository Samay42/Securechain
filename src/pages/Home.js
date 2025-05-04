import React, { useState } from "react";
import axios from "axios";
import { uploadFile, generateKey, encryptCID } from "../api";

const Home = () => {
  const [file, setFile] = useState(null);
  const [key, setKey] = useState("");
  const [encryptedCid, setEncryptedCid] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Handle File Selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Upload File & Encrypt CID
  const handleUploadAndEncrypt = async () => {
    if (!file) {
      // alert("Please select a file first!");
      setError("Please select a file first!");
      setSuccess(null);
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Upload file to backend
      const uploadResponse = await uploadFile(formData);

      if (!uploadResponse.success) {
        // alert("Upload failed: " + uploadResponse.error);
        setLoading(false);
        setError(uploadResponse.error);
        setSuccess(null);
        return;
      }

      // Generate Encryption Key
      const keyResponse = await generateKey();
      if (!keyResponse.success) {
        // alert("Key generation failed: " + keyResponse.error);
        setLoading(false);
        setError(keyResponse.error);
        setSuccess(null);
        return;
      }
      const generatedKey = keyResponse.key;
      setKey(generatedKey);
      // Encrypt CID

      const cid = uploadResponse.ipfsHash;
      const encryptResponse = await encryptCID(cid, generatedKey);

      if (encryptResponse.success) {
        setEncryptedCid(encryptResponse.encryptedCID);
        // alert("File uploaded and encrypted successfully!");
        setError(null);
        setSuccess("File uploaded and encrypted successfully!");
      } else {
        // alert("Encryption failed: " + encryptResponse.error);
        setError(encryptResponse.error);
        setSuccess(null);
      }
    } catch (error) {
      console.error("Error:", error.response.data);
      if (error.response.data.error === "File size exceeds 100MB limit") {
        // alert("File size exceeds 100MB limit. Please upload a smaller file.");
        setError("File size exceeds 100MB limit. Please upload a smaller file.");
        setSuccess(null);
      } else{
        // alert("Something went wrong!");
        setError("Something went wrong!");
        setSuccess(null);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Upload & Encrypt Your File</h2>
      {/* File Upload Form */}
      {/* File Upload */}
      <div className="mb-3">
        <input type="file" onChange={handleFileChange} className="form-control" />
      </div>
      {error?(
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : null}
      {success?(
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      ) : null}
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
