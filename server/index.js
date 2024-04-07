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
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use('/admin/api', adminAPI);

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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public/'));
  app.get('/admin', (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});