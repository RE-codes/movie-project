const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./router');
const keys = require('./config/keys');

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// DB Setup
mongoose.connect(keys.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true }, err => {
  if (err) {
    console.error(err);
  }
  console.log('Connected to MongoDB...');
});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
router(app);

// Server Setup
const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
