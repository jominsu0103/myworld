const commentService = require("../services/commentService");

const addComment = async (req, res) => {
  try {
    const result = await commentService.addComment(req);
    res.status(201).json({
      message: "New comment creation successful",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const getComments = async (req, res) => {
  try {
    const result = await commentService.getComments(req);
    res.status(200).json({
      message: "Successful retrieval of comment list",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const result = await commentService.deleteComment(req);
    res.status(200).json({
      message: "Comment deletion successful",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

module.exports = {
  addComment,
  getComments,
  deleteComment,
};
