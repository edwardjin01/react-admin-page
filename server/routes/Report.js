const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const validator = require('../validator');
const schema = require('../validator/schema/video');
const models = require('../models');
// console.log('saving file at location: ', path.join(__dirname, '../uploads'))
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});


const upload = multer({ storage: storage});

const client = require('../db');

router.get('/', (req, res) => {
  const {_start, _end, _order, _sort} = req.query;
  // models.Report.findAll({include: [{model: models.Token}],order: [[_sort, _order]] }).then(reports => {
  models.Report.findAll({order: [[_sort, _order]]}).then(reports => {
    res.set('x-total-count', reports.length);
    res.send(reports);
  }).catch(error => {
    res.send(error);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  models.Video.findAll({where: {id}})
      .then((reports => {
        let report = reports[0];
        return res.send(report);
      }))
      .catch(error => res.send(error));
});

router.post('/', upload.fields([{
  name: 'thumbnailUri', maxCount: 1
}, {
  name: 'reportUri', maxCount: 1
}]), async (req, res) => {

  const data = {
    ...req.body,
    thumbnailUri: `http://localhost:8080/uploads/${req.files ? req.files.thumbnailUri[0].filename : 'thumbnail.png'}`,
    reportUri: `http://localhost:8080/uploads/${req.files ? req.files.reportUri[0].filename : '_doc.png'}`,
  };
  models.Report.create(data).then(report => res.send(report)).catch(error => {
    return res.send(error)
  });
});

router.put('/:id', upload.fields([{
  name: 'thumbnailUri', maxCount: 1
}, {
  name: 'reportUri', maxCount: 1
}]), async (req, res) => {
  const {id} = req.params;
  const data = {
    ...req.body,
    thumbnailUri: `http://localhost:8080/uploads/${req.files ? req.files.thumbnailUri[0].filename : 'thumbnail.png'}`,
    reportUri: `http://localhost:8080/uploads/${req.files ? req.files.reportUri[0].filename : '_doc.png'}`,
  };
  models.Report.update({data}, {where: {id}, returning: true})
      .then(report => res.send(report))
      .catch(error => {
        return res.send(error)
      });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  models.Report.destroy({where: {id}}).then(() => {
    return res.send({});
  })
});

module.exports = router;
