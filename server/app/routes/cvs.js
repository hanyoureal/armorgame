const express = require('express');
const router = express.Router();
const cvCtrl = require('../controllers/cv.controller');

router.post('/cvs', cvCtrl.create);
router.put('/cvs/:id', cvCtrl.update);
router.get('/cvs', cvCtrl.getAll);
router.get('/cvs/:id', cvCtrl.getOne);
router.delete('/cvs/:id', cvCtrl.remove);

module.exports = router;
