const router = require('express').Router();
const chatroomController = require('../controllers/chatroomController');
const catchErrors = require('../errorHandler');
const auth = require('../middlewares/auth');

router.post('/', auth, catchErrors(chatroomController.createRoom));

module.exports = router