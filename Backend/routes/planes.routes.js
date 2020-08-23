const express = require('express');
const router = express.Router();
const planesController = require('../controllers/planes.controller');

router.post('/create',planesController.createPlanes);

module.exports = router; 