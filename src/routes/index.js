const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");
const folderRouter = require("./folderRouter");
const photoRouter = require("./photoRouter");

router.use("/users", userRouter.router);
router.use("/folders", folderRouter.router);
router.use("/photos", photoRouter.router);

module.exports = router;
