const appDataSource = require("./dataSource");

const insertComment = async (userId, content, diaryId) => {
  try {
    const result = await appDataSource.query(
      `INSERT INTO diary_comment (user_id , content , diary_id) VALUES (?,?,?)`,
      [userId, content, diaryId]
    );
    return result;
  } catch (error) {
    console.error("댓글 생성 중 오류", error);
    throw error;
  }
};

const selectComment = async (diaryId) => {
  try {
    const result = await appDataSource.query(
      `SELECT * FROM diary_comment WHERE diary_id = ?`,
      [diaryId]
    );
    return result;
  } catch (error) {
    console.error("댓글 조회 중 오류", error);
    throw error;
  }
};

const deleteComment = async (userId, commentId) => {
  try {
    const result = await appDataSource.query(
      `DELETE FROM diary_comment WHERE user_id = ? AND id =?`,
      [userId, commentId]
    );
    return result;
  } catch (error) {
    console.error("댓글 삭제 중 오류", error);
    throw error;
  }
};

module.exports = {
  insertComment,
  selectComment,
  deleteComment,
};
