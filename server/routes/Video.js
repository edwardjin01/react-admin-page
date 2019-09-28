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
  models.Video.findAll({ include: [{ model: models.Token}, { model: models.VideoCategory }], order: [[_sort, _order]] }).then(videos => {
    res.set('x-total-count', videos.length);
    res.send(videos);
  }).catch(error => {
    res.send(error);
  });
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  models.Video.findAll({ include: [{ model: models.Token, through: { attributes: [] }}, { model: models.VideoCategory, through: { attributes: [] }}], where: { id } })
    .then((videos => {
      let video = videos[0];
      video.tokens = video.tokens.map(token => token.id);
      video.videoCategories = video.videoCategories.map(token => token.id);
      return res.send(video);
    }))
    .catch(error => res.send(error));
})

router.post('/', upload.single('thumbnail'), async (req, res) => {
  const validate = validator.compile(schema);
  const valid = validate(req.body);
  if (!valid) {
    return res.send(validate.errors);
  }
  const embededCode = decode(req.body.embededCode);
  const tokens = req.body.tokens.split(',');
  const videoCategories = req.body.videoCategories.split(',');
  const data = {
    ...req.body, 
    thumbnailUri: `http://localhost:8080/uploads/${req.file ? req.file.filename : 'thumbnail.png'}`,
    embededCode,
  };
  models.Video.create(data)
  .then(video => Promise.all([video.setTokens(tokens), video.setVideoCategories(videoCategories)]))
  .then(videoTokens => res.send(video))
  .catch(error => res.send(error));
})

router.put('/:id', (req, res) => {
  const validate = validator.compile(schema);
  const valid = validate(req.body);
  if (!valid) {
    return res.send(validate.errors);
  }
  const { id } = req.params;
  const embededCode = decode(req.body.embededCode);
  const { tokens, videoCategories } = req.body;
  models.Video.update({...req.body, embededCode}, { where: { id }, returning: true })
    .then(video => {
      if (video && video.length > 1) {
        const updated = video[1][0];
        return Promise.all([updated.setTokens(tokens), updated.setVideoCategories(videoCategories)])
      }
      return res.send({});
    })    
    .then((videoTokens) => models.Video.findAll({where: { id }}))
    .then((video => res.send(video[0])))
    .catch(error => {
      return res.send(error)
    });
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  models.Video.destroy({ where: { id } }).then(() => {
    return res.send({});
  })
});

module.exports = router;
