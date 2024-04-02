const express = require('express');
const app = express();
const cors = require('cors');
const mockData = require('./mock');
const adminAPI = require('./api/admin');
require('dotenv').config();
const mongoose = require('mongoose');
const { MONGO_URI } = process.env;

mongoose.connect(MONGO_URI);

app.use(cors());
app.use(express.json());
app.use('/admin', adminAPI);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the space provider API! 🚀. Try /room?id=LIB-350!'
  });
});

app.get('/room', (req, res) => {
  const { id } = req.query;
  const room = mockData[id] ?? 'Room not found';
  res.json(room);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});