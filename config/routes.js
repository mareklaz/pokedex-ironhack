const router = require('express').Router();

const miscController = require('../controllers/misc.controller');

// Misc
router.get('/', miscController.home);

// Auth > Register
router

module.exports = router; // ???
