const express = require("express");
const router = express.Router();
const authJWT = require("../middlewares/authJWT");
const refreshJWT = require("../utils/refresh");
const commentController = require("../controllers/commentController");

// 댓글 추가
router.post("/:diaryId/comments", authJWT, commentController.addComment);

// 댓글 조회
router.get("/:diaryId/comments", authJWT, commentController.getComments);

// 댓글 삭제
router.delete("/:diaryId/comments/:commentId", authJWT, commentController.deleteComment);

module.exports.router = router;