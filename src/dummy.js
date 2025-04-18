const crypto = require('crypto');

const encryptCID = (cid, key) => {
  const iv = Buffer.alloc(16, 0);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key, 'hex'), iv);
  let encrypted = cipher.update(cid, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

// Replace with your generated key and fake CID
const key = "6c85c2017f09a1501995bc9313074526c818619d4d207b089ab4778fa83bc7aa"; 
const fakeCID = "QmFakeIPFSHash"; 

const encryptedCID = encryptCID(fakeCID, key);
console.log("Encrypted CID:", encryptedCID);
