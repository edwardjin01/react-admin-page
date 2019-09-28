const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');
const validator = require('../validator');
const schema = require('../validator/schema/video');
const models = require('../models');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage});

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

router.post('/', upload.single('thumbnail'), async (req, res) => {
  const validate = validator.compile(schema);
  const valid = validate(req.body);
  if (!valid) {
    return res.send(validate.errors);
  }
  const postTime = req.body.postTime || new Date();
  const data = {...req.body, thumbnailUri: `/uploads/${req.file.filename}`, postTime};
  console.log(data);
  models.Video.create(data, {w: 1}, { returning: true }).then(video => {
    return res.send(video);
  });
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