const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");
const folderRouter = require("./folderRouter");

router.use("/users", userRouter.router);
router.use("/folders", folderRouter.router);

module.exports = router;
