'use strict';
const _ = require('lodash');
const Cv = require('../models/cv.model');
const COLLECTION_MAP = {};
let idCount = 0;

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 50;
const DEFAULT_SKIP = 0;

class CvService {
  constructor(CvModel) {
    this.Cv = CvModel || Cv;
  }

  create(data, callback) {
    let cv = Object.assign({}, data);
    let err = null;
    cv._id = idCount++;
    COLLECTION_MAP[cv._id] = cv;
    callback(err, COLLECTION_MAP[cv._id]);
  }

  getAll(callback) {
    let err = null;
    callback(err, COLLECTION_MAP);
  }

  findById(id, callback) {
    let cv = COLLECTION_MAP[id];
    let err = null;
    callback(err, cv);
  }

  update(id, data, callback) {
    COLLECTION_MAP[id] = Object.assign(COLLECTION_MAP[id], data);
    callback(err, COLLECTION_MAP[id]);
  }

  remove(id, callback) {
    var cv = Object.assign({}, COLLECTION_MAP[id]);
    delete COLLECTION_MAP[id];
    callback(null, cv);
  }
}

module.exports = CvService;
