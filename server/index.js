const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const errorhandler = require('errorhandler');

const coins = require('./routes/Coin');
const users = require('./routes/User');
const videos = require('./routes/Video');
const reports = require('./routes/Report');

const app = express();
const port = 8080;

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
console.log('serving static file at: ', path.join(__dirname, 'uploads'));

app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }))

app.use(bodyParser.json({ limit:'50mb' }));

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
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NjkzMTE3NDYsImV4cCI6MTYwMTQ1MjU0NiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjoiQWRtaW5pc3RyYXRvciJ9.C2l3nyEAcEdZ_lw9l1Ti5kEYA148O5oxlz9E41XYZ3I';
  return res.json({ token });
});

app.use(errorhandler());

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
