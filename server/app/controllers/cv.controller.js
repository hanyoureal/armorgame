const CvService = require('../services/cv.service');
const cvService = new CvService();

module.exports.create = create;
module.exports.update = update;
module.exports.getAll = getAll;
module.exports.getOne = getOne;
module.exports.remove = remove;


function create(req, res, next) {
  const data = req.body;

  cvService.create(data, (err, cv) => {
    if (err) {
      return next(err);
    }

    res.status(201).json(cv);
  });
};

function update(req, res, next) {
  const data = req.body;
  let id = req.params.id;
  cvService.update(id, data, (err, cv) => {
    if (err) {
      return next(err);
    }

    if (cv) {
      res.status(200).json(cv);
    }
    else {
      res.status(404).json({error: 'Entity not found'})
    }
  });
};

function getAll(req, res, next) {
  cvService.getAll((err, cvs) => {
    if (err) {
      return next(err);
    }

    res.status(200).json(cvs);
  });
};

function getOne(req, res, next) {
  let id = req.params.id;

  cvService.findById(id, (err, cv) => {
    if (err && err.status) {
      return res.status(err.status).json(cv);
    } else if (err) {
      return next(err);
    }
    
    if (cv) {
      res.status(200).json(cv);
    }
    else {
      res.status(404).json({error: 'Entity not found'})
    }
  });
};

function remove(req, res, next) {
  let id = req.params.id;

  cvService.remove(id, (err, cv) => {
    if (err) {
      return next(err);
    }

    if (cv) {
      res.status(200).json(cv);
    }
    else {
      res.status(404).json({error: 'Entity not found'})
    }
  });
};
