const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/', limits: { fieldSize: 25 * 1024 * 1024 } });

const client = require('../db');

router.get('/', (req, res) => {
  client.query('SELECT * FROM reports', (error, response) => {
    if (error) {
      return res.send(error);
    }
    res.set('x-total-count', response.rows.length);
    return res.json(response.rows);
  })
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  client.query('SELECT * FROM reports WHERE id = $1', [ id ], (error, response) => {
    if (error) {
      return res.send(error);
    }
    return res.json(response.rows[0]);
  })
})

router.post('/', upload.single('picture'), (req, res) => {
  const { name,  description  } = req.body;
  const path = 'path';
  const thumbnail_image = 'thumbnail_image';
  const text = 'INSERT INTO reports(path, name,  description, thumbnail_image) values ($1, $2, $3, $4) RETURNING *';
  const values = [path, name,  description, thumbnail_image];
  client.query(text, values, (error, response) => {
    if (error) {
      return res.send(error);
    }
    return res.json(response.rows[0]);
  })
})

router.put('/:id', (req, res) => {
  const { path, name,  description, thumbnai_image } = req.body;
  const { id } = req.params;
  const text = 'UPDATE reports SET path = $1, name = $2, description = $3, thumbnai_image = $4 WHERE id = $3 RETURNING *';
  const values = [path, name,  description, thumbnai_image, id];
  client.query(text, values, (error, response) => {
    if (error) {
      return res.send(error);
    }
    return res.json(response.rows[0]);
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const text = 'DELETE FROM reports where id = $1';
  const values = [ id ];
  client.query(text, values, (error, response) => {
    if (error) {
      return res.send(error);
    }
    return res.json({rowCount: response.rowCount});    
  })
});

module.exports = router;