const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/signUp", userController.signUp);
router.post("/signIn", userController.signIn);

router.post("/phoneAuth", userController.phoneAuth);
router.post("/phoneAuth/phoneVerifyNumber", userController.phoneVerifyNumber);

router.post("/emailAuth", userController.emailAuth);
router.post("/emailAuth/emailVerifyNumber", userController.emailVerifyNumber);

module.exports.router = router;
