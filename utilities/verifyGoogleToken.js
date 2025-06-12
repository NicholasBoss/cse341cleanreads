const { OAuth2Client } = require('google-auth-library');
// import env variables
require('dotenv').config();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'Missing token' });

    const token = authHeader.split(' ')[1]; // Bearer <token>
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    req.user = payload;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
  }
}
module.exports = authenticateToken;