import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const uploadFile = async (formData) => {

  const response = await axios.post(`${API_URL}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const encryptCID = async (cid, key) => {
  const response = await axios.post(`${API_URL}/encrypt`, { cid, key });
  return response.data;
};

export const decryptCID = async (encryptedCID, key) => {
  const response = await axios.post(`${API_URL}/decrypt`, { encryptedCID, key });
  return response.data;;
};

export const retrieveFile = async (cid) => {
  return axios.get(`https://gateway.pinata.cloud/ipfs/${cid}`);
};

export const generateKey = async () => {
  const response = await axios.get(`${API_URL}/generate-key`);
  return response.data;
}
  