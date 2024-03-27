const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json('Hello World');
});

app.get('/echo', (req, res) => {
  res.json(req.query);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});