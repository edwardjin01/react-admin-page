const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const path = require('path');

const coins = require('./routes/Coin');
const users = require('./routes/User');
const videos = require('./routes/Video');
const reports = require('./routes/Report');

const app = express();
const port = 8080;

// app.use(express.static('uploads'));
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))

app.use(bodyParser.json());

app.use(cors({
  exposedHeaders: ['X-Total-Count'],
}));


app.use('/coins', coins);
app.use('/users', users);
app.use('/videos', videos);
app.use('/reports', reports);

app.post('/authenticate', (req, res) => {
  const { username, password } = req.body;
  if (username !== 'admin' || password !== '123456') {
    return res.status(401).send('Invalid username or password');
  }
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NjkyOTM0NjgsImV4cCI6MTYwMDgyOTQ2OCwiYXVkIjoid3d3LmNvaW45OC5jb20iLCJzdWIiOiJhZG1pbkBjb2luOTguY29tIiwicm9sZSI6IkFkbWluaXN0cmF0aW9uIn0.7xjxw2V8YWxP96zVz0NDCc75Z0KBGmM9fbsKQ3iMjSQ';
  return res.json({ token });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));