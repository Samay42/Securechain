import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import multer from 'multer';
import axios from 'axios';
import crypto from 'crypto';
import cors from 'cors';
import FormData from 'form-data';
// import { ethers } from 'ethers';
import bodyParser from 'body-parser';

// Fix '__dirname' in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log("PINATA_API_KEY:", process.env.PINATA_API_KEY ? "Loaded" : "MISSING");
console.log("PINATA_SECRET_API_KEY:", process.env.PINATA_SECRET_API_KEY ? "Loaded" : "MISSING");

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(bodyParser.json());  
app.use(cors());

// Multer: Use Memory Storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// -------------------------
// ROOT ROUTE
// -------------------------
app.get("/", (req, res) => res.send("Server is up and running! 🚀"));

// -------------------------
// ENCRYPTION FUNCTIONS
// -------------------------
const generateKey = () => crypto.randomBytes(32).toString('hex');

const encryptCID = (cid, key) => {
  if (key.length !== 64) throw new Error("Encryption key must be 64 hex characters (32 bytes)");

  const iv = Buffer.alloc(16, 0); 
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
  let encrypted = cipher.update(cid, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  console.log(`Encrypted CID: ${encrypted}`);

  return encrypted;
};

const decryptCID = (encryptedCID, key) => {
  if (key.length !== 64) throw new Error("Decryption key must be 64 hex characters (32 bytes)");

  const iv = Buffer.alloc(16, 0);
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
  let decrypted = decipher.update(encryptedCID, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

// -------------------------
// ENCRYPT ENDPOINT
// -------------------------
app.post('/encrypt', (req, res) => {
  try {
    console.log(req.body);
    const { cid, key } = req.body;
    console.log("Encrypting CID:", cid, "with key:", key);
    if (!cid || !key) return res.status(400).json({ error: "CID and key are required" });

    const encryptedCID = encryptCID(cid, key);
    console.log(`CID encrypted: ${encryptedCID}`);
    res.json({ success: true, encryptedCID });
  } catch (error) {
    res.status(500).json({ error: "Encryption failed", details: error.message });
  }
});

// -------------------------
// DECRYPT ENDPOINT
// -------------------------
app.post('/decrypt', (req, res) => {
  try {
    const { encryptedCID, key } = req.body;
    if (!encryptedCID || !key) return res.status(400).json({ error: "Encrypted CID and key are required" });

    const decryptedCID = decryptCID(encryptedCID, key);
    console.log(`CID decrypted: ${decryptedCID}`);
    res.json({ success: true, decryptedCID });
  } catch (error) {
    res.status(500).json({ error: "Decryption failed", details: error.message });
  }
});

// -------------------------
// GENERATE KEY ENDPOINT
// -------------------------
app.get('/generate-key', (req, res) => {
  const key = generateKey();
  console.log(`New key generated: ${key}`);
  res.json({ success: true, key });
});

// -------------------------
// FILE UPLOAD TO PINATA
// -------------------------
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, error: "No file uploaded" });

    const { PINATA_API_KEY, PINATA_SECRET_API_KEY } = process.env;
    if (!PINATA_API_KEY || !PINATA_SECRET_API_KEY) throw new Error("Missing Pinata API keys");

    const formData = new FormData();
    formData.append('file', req.file.buffer, { filename: req.file.originalname });

    const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
      headers: {
        ...formData.getHeaders(),
        'pinata_api_key': PINATA_API_KEY,
        'pinata_secret_api_key': PINATA_SECRET_API_KEY
      },
    });

    console.log(`File uploaded. IPFS Hash: ${response.data.IpfsHash}`);
    res.json({ success: true, ipfsHash: response.data.IpfsHash });
  } catch (error) {
    console.error("Upload error:", error.response ? error.response.data : error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// -------------------------
// RETRIEVE FILE FROM BLOCKCHAIN
// -------------------------
app.post('/retrieve', async (req, res) => {
  try {
    const { encryptedCID, key } = req.body;
    if (!encryptedCID || !key) return res.status(400).json({ error: "Encrypted CID and key are required" });

    const decryptedCID = decryptCID(encryptedCID, key);
    console.log(`Retrieved CID: ${decryptedCID}`);
    res.json({ success: true, cid: decryptedCID });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving file", details: error.message });
  }
});

// -------------------------
// START SERVER
// -------------------------
app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
