// api/proxy/[...path].js
export default async function handler(req, res) {
  const url = `http://sistec-read.atwebpages.com/backend/api/${req.query.path.join('/')}`;
  
  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...req.headers,
      },
      body: req.method === 'POST' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.text();
    res.status(response.status).setHeader('Content-Type', 'application/json').send(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy error' });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};