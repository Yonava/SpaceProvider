const express = require('express');
const app = express();
const cors = require('cors');
const mockData = require('./mock');
const adminAPI = require('./api/admin');

// example of middleware you can use
function myMiddleware(req, res, next) {
  console.log('I am a middleware!');

  // you can modify the request object here
  req.query.example = 'hi from middleware!';

  // this will be passed to the endpoint handler!

  // call next to move on to the next middleware or endpoint handler if there are no more middleware functions
  next();
}

// we tell our server to use the middleware every time a request comes in
app.use(myMiddleware);

// this lets other people access the uri of the server
// and it stands for cross origin resource sharing (example of a middleware)
app.use(cors());

// this lets us parse the request body as json (another example of useful middleware!)
app.use(express.json());

app.use('/admin', adminAPI);

app.get('/', (req, res) => {

  // this will log out "hi from middleware!" in the servers console
  console.log(req.example)

  res.json({
    message: 'Welcome to the space provider API! 🚀. Try /room?id=LIB-350!'
  });
});

app.get('/room', (req, res) => {
  // get the id from the query string
  const { id } = req.query;
  // if mockData[id] is null or undefined, return 'Room not found' otherwise return the room
  const room = mockData[id] ?? 'Room not found';
  res.json(room);
});

// ports are dynamically assigned in production, so we need to check if a port is provided by the environment
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});