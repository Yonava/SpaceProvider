/**
 * @module index
 * @desc entry point for the space provider API
 */

require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const adminAPI = require('./api/admin');
const v1API = require('./api/v1/index');
const { limitRequestRate } = require('./rateLimiter')

const { MONGO_URI } = process.env;
mongoose.connect(MONGO_URI);

const rateLimiter = limitRequestRate({
  requestLimit: 2,
  backoffDurationMs: 2000,
  paths: ['/api/v1'],
})

app.use(rateLimiter);

// 50mb limit for image uploads
app.use(express.json({ limit: '50mb' }));
app.use(cors());

app.use('/admin/api', adminAPI);
app.use('/api/v1', v1API);

/**
 * @GET /
 * @desc teaser message for the API
 */
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Space Provider API! 🚀. Try /api/v1?room=ILC-S140!',
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