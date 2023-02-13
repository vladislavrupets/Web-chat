const router = require("express").Router();
const userController = require("../controllers/userController");
const catchErrors = require("../errorHandler");

router.post("/register", catchErrors(userController.register));
router.post("/login", catchErrors(userController.login));

module.exports = router;
