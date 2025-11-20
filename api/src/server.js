import express from 'express';

const app = express();

app.get('/', (req, res) => {
  const accept = req.accepts(['html', 'json', 'text']);

  if (accept === 'html') {
    return res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Trip Pole Backend</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              background: #f5f5f5; 
              padding: 40px; 
            }
            .box {
              background: white;
              padding: 25px;
              border-radius: 10px;
              box-shadow: 0 0 8px rgba(0,0,0,0.1);
            }
            h1 { margin-bottom: 10px; }
            p { margin: 5px 0; }
          </style>
        </head>
        <body>
          <div class="box">
            <h1>Vehiclete Back End</h1>
            <p>Status: <strong>Running</strong></p>
            <p>Version: 1.0.0</p>
            <p>Time: ${new Date().toLocaleString()}</p>
          </div>
        </body>
      </html>
    `);
  }

  if (accept === 'json') {
    return res.json({
      name: 'Trip Pole Backend',
      status: 'running',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    });
  }

  res.type('text').send('Trip Pole Backend is running');
});

app.listen(5000, () => console.log('Server running on port 5000'));
