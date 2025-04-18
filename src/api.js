import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const uploadFile = async (formData) => {
  return axios.post(`${API_URL}/upload`, formData);
};

export const encryptCID = async (cid, key) => {
  return axios.post(`${API_URL}/encrypt`, { cid, key });
};

export const decryptCID = async (encryptedCID, key) => {
  return axios.post(`${API_URL}/decrypt`, { encryptedCID, key });
};

export const retrieveFile = async (cid) => {
  return axios.get(`https://gateway.pinata.cloud/ipfs/${cid}`);
};
  