const express = require("express");
const router = express.Router();
const usersRouter = require("./usersRouter");

router.use("/users", usersRouter.router);

module.exports = router;