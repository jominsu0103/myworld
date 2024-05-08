const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");
const folderRouter = require("./folderRouter");
const photoRouter = require("./photoRouter");
const diaryRouter = require("./diaryRouter");
const commentRouter = require("./commentRouter");

router.use("/users", userRouter.router);
router.use("/folders", folderRouter.router);
router.use("/photos", photoRouter.router);
router.use("/diary", diaryRouter.roter);
router.use("/comment", commentRouter.router);

module.exports = router;
