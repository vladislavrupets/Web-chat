const router = require('express').Router();
const chatroomController = require('../controllers/ChatroomControllers/chatroomController');
const catchErrors = require('../errorHandler');
const auth = require('../middlewares/auth');

router.get('/', auth, catchErrors(chatroomController.getAllRooms));
router.post('/', auth, catchErrors(chatroomController.createRoom));

module.exports = router