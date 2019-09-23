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
    res.set('x-total-count', response.rows.length);
    return res.json({data: response.row.length ? response.rows[0] : {}});
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
  const text = 'UPDATE coins set name = $1, symbol = $2 where id = $3';
  const values = [name, symbol, id];
  client.query(text, values, (error, response) => {
    if (error) {
      return res.send(error);
    }
    return res.json({rowCount: response.rowCount});
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));