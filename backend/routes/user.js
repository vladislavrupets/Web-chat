const router = require('express').Router();
const { sha256 } = require('js-sha256');
const userController = require('../controllers/userController');
const catchErrors = require('../errorHandler');
const User = require('../models/userModel');

router.post("/register", catchErrors(userController.register));
router.post("/login", catchErrors(userController.login));


module.exports = router