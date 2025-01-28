const crypto = require('crypto');
const apikey = process.env.ENCRYPT_KEY;

const algorithm = 'aes-256-cbc';
const secretKey = crypto.createHash('sha256').update(String(apikey)).digest('base64').substr(0, 32); // Ensure 32-byte key
const iv = crypto.randomBytes(16);

const EncryptPassword = (password) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    let encrypted = cipher.update(password, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const result = `${iv.toString('hex')}:${encrypted}`;
    console.log('Encrypted Data:', result);
    return result;
}

module.exports = EncryptPassword;
