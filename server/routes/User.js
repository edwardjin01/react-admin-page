const express = require('express');
const router = express.Router();
const client = require('../db');
const multer = require('multer');
const upload = multer();

router.get('/', (req, res) => {
  client.query('SELECT * FROM users', (error, response) => {
    if (error) {
      return res.send(error);
    }
    res.set('x-total-count', response.rows.length);
    return res.json(response.rows);
  })
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  client.query('SELECT * FROM users WHERE id = $1', [ id ], (error, response) => {
    if (error) {
      return res.send(error);
    }
    return res.json(response.rows[0]);
  })
});

router.post('/', upload.none(), (req, res) => {
  const {name, phone, invitationCode} = req.body;
  const text = 'INSERT INTO users(name, phone, invitationCode) values ($1, $2, $3) RETURNING *';
  const values = [name, phone, invitationCode];
  client.query(text, values, (error, response) => {
    if (error) {
      return res.send(error);
    }
    return res.json(response.rows[0]);
  })
});

router.put('/:id', (req, res) => {
  const {name, phone, invitationCode} = req.body;
  const { id } = req.params;
  const text = 'UPDATE users SET name = $1, phone = $2, invitationCode = $3 WHERE id = $4 RETURNING *';
  const values = [name, phone, invitationCode, id];
  client.query(text, values, (error, response) => {
    if (error) {
      return res.send(error);
    }
    return res.json(response.rows[0]);
  })
});

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
