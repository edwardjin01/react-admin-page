const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', (req, res) => {
  const { _start, _end, _order, _sort } = req.query;
  models.VideoCategory.findAll({ order: [[_sort, _order]] }).then(categories => {
    res.set('x-total-count', categories.length);
    res.send(categories);
  }).catch(error => {
    res.send(error);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  models.VideoCategory.findAll({ where: { id } }).then((category => res.send(category[0])));
});

router.post('/', (req, res) => {
  models.VideoCategory.create(req.body, {w: 1}, { returning: true }).then(category => {
    return res.send(category);
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  models.VideoCategory.update(req.body, {where: { id }, returning: true, plain: true })
    .then(() => models.VideoCategory.findAll({where: { id }}))
    .then((category => res.send(category[0])));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  models.VideoCategory.destroy({ where: { id } }).then(() => {
    return res.send({});
  })
});

module.exports = router;
