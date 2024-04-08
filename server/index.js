const express = require('express');
const app = express();
const cors = require('cors');
const adminAPI = require('./api/admin');
const v1API = require('./api/v1/index');
require('dotenv').config();
const mongoose = require('mongoose');
const { MONGO_URI } = process.env;

mongoose.connect(MONGO_URI);

// 50mb limit for image uploads
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

app.use('/admin/api', adminAPI);
app.use('/api/v1', v1API);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the space provider API! 🚀. Try /api/v1?room=ILC-S140!',
    version: 1,
  });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public/'));
  app.get('/admin', (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});