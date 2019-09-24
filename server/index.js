const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser')

const app = express();
const port = 8080;

const client = require('./db');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

app.use(cors({
  exposedHeaders: ['X-Total-Count'],
}));

app.get('/coins', (req, res) => {
  client.query('SELECT * FROM COINS', (error, response) => {
    if (error) {
      return res.send(error);
    }
    res.set('x-total-count', response.rows.length);
    return res.json(response.rows);
  })
})

app.get('/coins/:id', (req, res) => {
  const { id } = req.params;
  client.query('SELECT * FROM COINS WHERE id = $1', [ id ], (error, response) => {
    if (error) {
      return res.send(error);
    }
    return res.json(response.rows[0]);
  })
})

app.post('/coins', (req, res) => {
  const { name, symbol } = req.body;
  const text = 'INSERT INTO coins(name, symbol, created_on) values ($1, $2, $3) RETURNING *';
  const values = [name, symbol, new Date()];
  client.query(text, values, (error, response) => {
    if (error) {
      return res.send(error);
    }
    return res.json(response.rows[0]);
  })
})

app.put('/coins/:id', (req, res) => {
  const { name, symbol } = req.body;
  const { id } = req.params;
  const text = 'UPDATE coins SET name = $1, symbol = $2 WHERE id = $3 RETURNING *';
  const values = [name, symbol, id];
  client.query(text, values, (error, response) => {
    if (error) {
      return res.send(error);
    }
    return res.json(response.rows[0]);
  })
})

app.delete('/coins/:id', (req, res) => {
  const { id } = req.params;
  const text = 'DELETE FROM coins where id = $1';
  const values = [ id ];
  client.query(text, values, (error, response) => {
    if (error) {
      return res.send(error);
    }
    return res.json({rowCount: response.rowCount});    
  })
})

app.post('/authenticate', (req, res) => {
  const { username, password } = req.body;
  if (username !== 'admin' || password !== '123456') {
    return res.status(401).send('Invalid username or password');
  }
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NjkyOTM0NjgsImV4cCI6MTYwMDgyOTQ2OCwiYXVkIjoid3d3LmNvaW45OC5jb20iLCJzdWIiOiJhZG1pbkBjb2luOTguY29tIiwicm9sZSI6IkFkbWluaXN0cmF0aW9uIn0.7xjxw2V8YWxP96zVz0NDCc75Z0KBGmM9fbsKQ3iMjSQ';
  return res.json({ token });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));