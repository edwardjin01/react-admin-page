const express = require('express');
const router = express.Router();
const client = require('../db');

router.get('/', (req, res) => {
  client.query('SELECT * FROM COINS', (error, response) => {
    if (error) {
      return res.send(error);
    }
    res.set('x-total-count', response.rows.length);
    return res.json(response.rows);
  })
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  client.query('SELECT * FROM COINS WHERE id = $1', [ id ], (error, response) => {
    if (error) {
      return res.send(error);
    }
    return res.json(response.rows[0]);
  })
})

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const text = 'DELETE FROM coins where id = $1';
  const values = [ id ];
  client.query(text, values, (error, response) => {
    if (error) {
      return res.send(error);
    }
    return res.json({rowCount: response.rowCount});    
  })
});

module.exports = router;