const express = require("express");
const router = express.Router();
const diaryController = require("../controllers/diaryController");
const authJWT = require("../middlewares/authJWT");
const refreshJWT = require("../utils/refresh");

router.post("/", authJWT, diaryController.insertDiary);
router.get("/", authJWT, diaryController.selectDiary);
router.put("/:diaryId", authJWT, diaryController.updateDiary);
router.delete("/:diaryId", authJWT, diaryController.deleteDiary);
router.get("/refresh", refreshJWT);

module.exports.roter = router;
