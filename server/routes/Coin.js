const express = require('express');
const router = express.Router();
const client = require('../db');
const multer = require('multer');
const upload = multer();

router.get('/', (req, res) => {
    client.query('SELECT * FROM TOKENS', (error, response) => {
    if (error) {
      return res.send(error);
    }
    res.set('x-total-count', response.rows.length);
    return res.json(response.rows);
  })
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
    client.query('SELECT * FROM TOKENS WHERE id = $1', [id], (error, response) => {
    if (error) {
        console.log('error', error);
      return res.send(error);
    }
    return res.json(response.rows[0]);
  })
})

router.post('/', upload.none(), (req, res) => {
    const {coingeckoTokenId, name, sticker} = req.body;
    const text = 'INSERT INTO TOKENS(coingeckoTokenId, name, sticker) values ($1, $2, $3) RETURNING *';
    const values = [coingeckoTokenId, name, sticker];
    client.query(text, values, (error, response) => {
        if (error) {
            return res.send(error);
        }
        return res.json(response.rows[0]);
    })
});

router.put('/:id', (req, res) => {
    const {coingeckoTokenId, name, sticker} = req.body;
  const { id } = req.params;
    const text = 'UPDATE TOKENS SET coingeckoTokenId = $1, name = $2, sticker = $3 WHERE id = $4 RETURNING *';
    const values = [coingeckoTokenId, name, sticker, id];
  client.query(text, values, (error, response) => {
    if (error) {
      return res.send(error);
    }
    return res.json(response.rows[0]);
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
    const text = 'DELETE FROM TOKENS where id = $1';
  const values = [ id ];
  client.query(text, values, (error, response) => {
    if (error) {
      return res.send(error);
    }
    return res.json({rowCount: response.rowCount});    
  })
});

module.exports = router;
