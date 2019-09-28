const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
// console.log('saving file at location: ', path.join(__dirname, '../uploads'))
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage});

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

router.post('/', upload.fields([{name: 'thumbnail_image'}, {name: 'path'}]), (req, res) => {
  const { name,  description  } = req.body;
  let { path, thumbnail_image } = req.files;
  path = `/uploads/${path[0].filename}`;  
  thumbnail_image = `${host}/${thumbnail_image[0].filename}`;
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
  const { name, description } = req.body;
  const { id } = req.params;
  const text = 'UPDATE reports SET name = $1, description = $2 WHERE id = $3 RETURNING *';
  const values = [name, description, id];
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