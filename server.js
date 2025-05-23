const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);

// Allow CORS from the frontend URL
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const PORT = process.env.PORT || 8001;

const io = new Server(httpServer, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

app.use(cors({
  origin: FRONTEND_URL
}));
app.use(express.json());

// Middleware to log all requests
app.use((req, res, next) => {
  const requestLog = {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
    timestamp: new Date().toISOString()
  };
  
  // Emit the request log to all connected clients
  io.emit('requestLog', requestLog);
  next();
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Request received at root endpoint!' });
});

// Webhook endpoint
app.post('/webhook', (req, res) => {
  const webhookData = req.body;
  console.log('Received webhook data:', webhookData);
  
  // Emit the webhook data to all connected clients
  io.emit('requestLog', {
    method: 'WEBHOOK',
    url: '/webhook',
    headers: req.headers,
    body: webhookData,
    timestamp: new Date().toISOString()
  });
  
  res.status(200).json({ message: 'Webhook received successfully!' });
});

app.post('/api/data', (req, res) => {
  res.json({ message: 'Data received!', data: req.body });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 