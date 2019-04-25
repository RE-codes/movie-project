const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./router');
const keys = require('./config/keys');

// DB Setup
mongoose.connect(keys.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true }, err => {
  if (err) {
    return console.error(err);
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
