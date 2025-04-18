import React, { useState } from "react";
import { decryptCID } from "../api";

const Decrypt = () => {
  const [encryptedCID, setEncryptedCID] = useState("");
  const [key, setKey] = useState("");
  const [decryptedCID, setDecryptedCID] = useState("");

  const handleDecrypt = async () => {
    if (!encryptedCID || !key) return alert("Please enter values.");
    try {
      const response = await decryptCID(encryptedCID, key);
      setDecryptedCID(response.data.decryptedCID);
    } catch (error) {
      console.error(error);
      alert("Decryption failed. Check your key.");
    }
  };

  return (
    <div className="container">
      <h2>Decrypt Encrypted CID</h2>
      <input type="text" className="form-control" placeholder="Encrypted CID" onChange={(e) => setEncryptedCID(e.target.value)} />
      <input type="text" className="form-control mt-2" placeholder="Key" onChange={(e) => setKey(e.target.value)} />
      <button className="btn btn-primary mt-2" onClick={handleDecrypt}>Decrypt</button>
      {decryptedCID && (
        <div>
          <h4>Decrypted CID:</h4>
          <p>{decryptedCID}</p>
        </div>
      )}
    </div>
  );
};

export default Decrypt;
