const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const client = require('../db');

router.get('/', (req, res) => {
  client.query('SELECT * FROM videos', (error, response) => {
    if (error) {
      return res.send(error);
    }
    res.set('x-total-count', response.rows.length);
    return res.json(response.rows);
  })
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  client.query('SELECT * FROM videos WHERE id = $1', [ id ], (error, response) => {
    if (error) {
      return res.send(error);
    }
    return res.json(response.rows[0]);
  })
})

router.post('/', upload.single('thumbnail_image'), (req, res) => {
  const { title, description } = req.body;
  let { thumbnail_image } = req.file;
  const host = 'http://localhost:8080/uploads';
  path = `${host}/${path[0].filename}`;
  thumbnail_image = `${host}/${thumbnail_image[0].filename}`;
  const text = 'INSERT INTO videos(title, description, created_at) values ($1, $2, $3) RETURNING *';
  const values = [title, description, new Date()];
  client.query(text, values, (error, response) => {
    if (error) {
      return res.send(error);
    }
    return res.json(response.rows[0]);
  })
})

router.put('/:id', (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;
  const text = 'UPDATE videos SET title = $1, description = $2 WHERE id = $3 RETURNING *';
  const values = [title, description, id];
  client.query(text, values, (error, response) => {
    if (error) {
      return res.send(error);
    }
    return res.json(response.rows[0]);
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const text = 'DELETE FROM videos where id = $1';
  const values = [ id ];
  client.query(text, values, (error, response) => {
    if (error) {
      return res.send(error);
    }
    return res.json({rowCount: response.rowCount});    
  })
});

module.exports = router;