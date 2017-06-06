const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const response = require('../helpers/response');

router.get('/users', userCtrl.getAll, response.toJSON('users'));
router.get('/users/:id', userCtrl.findById, response.toJSON('user'));
router.put('/users/:id', userCtrl.findById, userCtrl.update, response.toJSON('user'));
router.delete('/users/:id', userCtrl.delete);

module.exports = router;
