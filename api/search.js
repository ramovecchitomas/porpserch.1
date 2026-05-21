module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'Sin token' });

  // Armar URL de búsqueda con todos los parámetros que vengan
  const params = new URLSearchParams(req.query).toString();
  const url = `https://api.mercadolibre.com/sites/MLA/search?${params}`;

  try {
    const resp = await fetch(url, {
      headers: { 'Authorization': token }
    });
    const data = await resp.json();
    return res.status(resp.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
