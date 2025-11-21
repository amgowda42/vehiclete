import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/', (req, res) => {
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, '../..', 'public', 'index.html'));
  } else if (req.accepts('json')) {
    res.json({
      name: 'Vehiclete Backend',
      status: 'running',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    });
  } else if (req.accepts('text')) {
    res.type('text').send('Vehiclete Backend is running');
  } else {
    res.type('txt').send('Not Acceptable');
  }
});

router.get('/health-check', (req, res) => {
  res.status(200).json({
    message: 'Vehiclete API is working fine',
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

export default router;
