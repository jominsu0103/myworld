const commentDao = require("../models/commentDao");

const addComment = async (req) => {
  const userId = req.id;
  const content = req.body.content;
  const diaryId = req.params.diaryId;

  const result = await commentDao.insertComment(userId, content, diaryId);

  return { message: "COMMENT_ADD_SUCCESS", result };
};

const getComments = async (req) => {
  const diaryId = req.params.diaryId;

  const result = await commentDao.selectComment(diaryId);

  return result;
};

const deleteComment = async (req) => {
  const userId = req.id;
  const diaryId = req.params.diaryId;
  const commentId = req.params.commentId;

  const result = await commentDao.deleteComment(userId , commentId);

  return result;
};

module.exports = {
  addComment,
  getComments,
  deleteComment,
};
