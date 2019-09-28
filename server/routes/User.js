const express = require('express');
const router = express.Router();
const multer = require('multer');
const models = require('../models');
const upload = multer();

router.get('/', (req, res) => {
  const { _start, _end, _order, _sort } = req.query;
  models.User.findAll({ order: [[_sort, _order]] }).then(users => {
    res.set('x-total-count', users.length);
    res.send(users);
  }).catch(error => {
    res.send(error);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  models.User.findAll({ where: { id } }).then((user => res.send(user[0]))).catch(error => res.send(error));
});

router.post('/',upload.none(),  (req, res) => {
  models.User.create(req.body, {w: 1}, { returning: true }).then(user => {
    return res.send(user);
  }).catch(error => res.send(error));;
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  models.User.update(req.body, {where: { id }, returning: true, plain: true })
    .then(() => models.User.findAll({where: { id }}))
    .then((user => res.send(user[0])));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  models.User.destroy({ where: { id } }).then(() => {
    return res.send({});
  }).catch(error => res.send(error));
});

module.exports = router;
