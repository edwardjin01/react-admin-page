const express = require('express');
const router = express.Router();
const client = require('../db');

router.get('/', (req, res) => {
  client.query('SELECT * FROM users', (error, response) => {
    if (error) {
      return res.send(error);
    }
    res.set('x-total-count', response.rows.length);
    return res.json(response.rows);
  })
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  client.query('SELECT * FROM users WHERE id = $1', [ id ], (error, response) => {
    if (error) {
      return res.send(error);
    }
    return res.json(response.rows[0]);
  })
})

router.post('/', (req, res) => {
  const { email, name, phone } = req.body;
  const text = 'INSERT INTO users(email, name, phone, created_at) values ($1, $2, $3, $4) RETURNING *';
  const values = [email, name, phone, new Date()];
  client.query(text, values, (error, response) => {
    if (error) {
      return res.send(error);
    }
    return res.json(response.rows[0]);
  })
})

router.put('/:id', (req, res) => {
  const { email, name, phone } = req.body;
  const { id } = req.params;
  const text = 'UPDATE users SET email = $1, name = $2, phone = $3 WHERE id = $4 RETURNING *';
  const values = [email, name, phone, id];
  client.query(text, values, (error, response) => {
    if (error) {
      return res.send(error);
    }
    return res.json(response.rows[0]);
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const text = 'DELETE FROM users where id = $1';
  const values = [ id ];
  client.query(text, values, (error, response) => {
    if (error) {
      return res.send(error);
    }
    return res.json({rowCount: response.rowCount});    
  })
});

module.exports = router;