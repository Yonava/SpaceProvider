const express = require('express');
const app = express();
const cors = require('cors');
const adminAPI = require('./api/admin');
require('dotenv').config();
const mongoose = require('mongoose');
const { MONGO_URI } = process.env;

mongoose.connect(MONGO_URI);
const Room  = require('./schemas/rooms');

app.use(cors());

// for image uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

app.use('/admin/api', adminAPI);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the space provider API! 🚀. Try /room?id=LIB-350!'
  });
});

app.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

app.get('/room', async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ message: 'Invalid request, specify the id in query' });
  }

  const [building, roomNum] = id.split('-');
  if (!building || !roomNum) {
    return res.status(400).json({ message: 'Invalid room id' });
  }

  try {
    const room = await Room.findOne({
      building,
      room: roomNum
    })
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }

});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public/'));
  app.get('/admin', (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});