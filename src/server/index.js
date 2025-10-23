const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'k12-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Import routes
const apiRoutes = require('./routes/api');
const modelRoutes = require('./routes/models');
const simulationRoutes = require('./routes/simulation');
const scormRoutes = require('./routes/scorm');
const quizRoutes = require('./routes/quiz');

// API routes
app.use('/api', apiRoutes);
app.use('/api/models', modelRoutes);
app.use('/api/simulation', simulationRoutes);
app.use('/api/scorm', scormRoutes);
app.use('/api/quiz', quizRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Cell Collective K-12 Server Running' });
});

// Socket.IO for real-time simulation
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('startSimulation', async (data) => {
    try {
      const { modelId, initialConditions, steps } = data;
      // Simulation logic will be implemented
      socket.emit('simulationUpdate', { step: 0, data: {} });
    } catch (error) {
      socket.emit('simulationError', { error: error.message });
    }
  });

  socket.on('stopSimulation', () => {
    console.log('Simulation stopped by client');
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Cell Collective K-12 Server running on port ${PORT}`);
  console.log(`📚 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = { app, io };
