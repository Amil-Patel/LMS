const crypto = require('crypto');
const apikey = process.env.ENCRYPT_KEY;

const algorithm = 'aes-256-cbc';
const secretKey = crypto.createHash('sha256').update(String(apikey)).digest('base64').substr(0, 32);

const DecryptPassword = (encryptedData) => {
    const [ivHex, encrypted] = encryptedData.split(':');

    const iv = Buffer.from(ivHex, 'hex');

    if (iv.length !== 16) {
        throw new Error('Invalid IV length. Must be 16 bytes.');
    }

    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}


module.exports = DecryptPassword;
