export default function adminAuth(req, res, next) {
  const apiKey = process.env.ADMIN_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'ADMIN_API_KEY not configured on server' });

  // Support Authorization: Bearer <key> or x-admin-key header
  const auth = req.headers.authorization || req.headers['x-admin-key'];
  if (!auth) return res.status(401).json({ error: 'Missing admin credentials' });

  let key = auth;
  if (typeof auth === 'string' && auth.toLowerCase().startsWith('bearer ')) {
    key = auth.slice(7).trim();
  }

  if (key !== apiKey) return res.status(403).json({ error: 'Invalid admin credentials' });
  next();
}
