const express = require('express');
const path = require('path');
const decode = require('unescape');
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
  const { _start, _end, _order, _sort } = req.query;
  models.Video.findAll({ order: [[_sort, _order]] }).then(videos => {
    res.set('x-total-count', videos.length);
    res.send(videos);
  }).catch(error => {
    res.send(error);
  });
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  models.Video.findAll({ where: { id } }).then((video => res.send(video[0])));
})

router.post('/', upload.single('thumbnail'), async (req, res) => {
  const validate = validator.compile(schema);
  const valid = validate(req.body);
  if (!valid) {
    return res.send(validate.errors);
  }
  const postTime = req.body.postTime || new Date();
  const embededCode = decode(req.body.embededCode);
  const data = {...req.body, thumbnailUri: `http://localhost:8080/uploads/${req.file.filename}`, embededCode, postTime};
  console.log(data);
  models.Video.create(data, {w: 1}, { returning: true }).then(video => {
    return res.send(video);
  });
})

router.put('/:id', (req, res) => {
  const validate = validator.compile(schema);
  const valid = validate(req.body);
  if (!valid) {
    return res.send(validate.errors);
  }
  const { id } = req.params;
  const embededCode = decode(req.body.embededCode);
  models.Video.update({...req.body, embededCode}, {where: { id }, returning: true, plain: true })
    .then(() => models.Video.findAll({where: { id }}))
    .then((video => res.send(video[0])));
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  models.Video.destroy({ where: { id } }).then(() => {
    return res.send({});
  })
});

module.exports = router;
