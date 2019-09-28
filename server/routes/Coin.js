const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({});
const models = require('../models');
const validator = require('../validator');
const schema = require('../validator/schema/coin');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', (req, res) => {
  const { _start, _end, _order, _sort } = req.query;
  const { id } = req.query;
  let query = {};
  query = id ? { ...query, where: { id: {[Op.in]: [+id] }}} : query;
  query = _sort && _order ? {...query, order: [[_sort, _order]]} : query;
  models.Token.findAll(query).then(tokens => {
    res.set('x-total-count', tokens.length);
    res.send(tokens);
  }).catch(error => {
    res.send(error);
  });
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  models.Token.findAll({ where: { id } })
    .then((token => res.send(token[0])))
    .catch(error => res.send(error));
})

router.post('/', upload.none(), (req, res) => {
  const validate = validator.compile(schema);
  const valid = validate(req.body);
  if (!valid) {
    return res.send(validate.errors);
  }
  models.Token.create(req.body, {w: 1}, { returning: true })
  .then(token => res.send(token))
  .catch(error => res.send(error));
})

router.put('/:id', (req, res) => {
  const validate = validator.compile(schema);
  const valid = validate(req.body);
  if (!valid) {
    return res.send(validate.errors);
  }
  const { id } = req.params;
  models.Token.update(req.body, {where: { id }, returning: true, plain: true })
    .then(() => models.Token.findAll({where: { id }}))
    .then((token => res.send(token[0])));
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  models.Token.destroy({ where: { id } }).then(() => {
    return res.send({});
  })
});

module.exports = router;
