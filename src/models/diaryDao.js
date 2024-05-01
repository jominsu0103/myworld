const appDataSource = require("./dataSource");

const insertDiary = async (userId, title, content) => {
  try {
    const result = await appDataSource.query(
      `INSERT INTO diary(user_id , diary_title , diary_content) VALUES (?,?,?)`,
      [userId, title, content]
    );
    return result;
  } catch (error) {
    console.error("다이어리 생성 중 오류", error);
    throw error;
  }
};

const selectDiary = async (userId) => {
  try {
    const result = await appDataSource.query(
      `SELECT * FROM diary WHERE user_id = ?`,
      [userId]
    );
    return result;
  } catch (error) {
    console.error("다이어리 목록 불러오는 중 오류", error);
    throw error;
  }
};

const findDiaryById = async (diaryId) => {
  try {
    const result = await appDataSource.query(
      `SELECT * FROM diary WHERE id = ?`,
      [diaryId]
    );
    console.log(result);
    return result;
  } catch (error) {
    console.error("다이어리 id로 정보 불러오는 중 오류", error);
    throw error;
  }
};

const updateDiary = async (newTitle, newContent, userId, diaryId) => {
  try {
    const findDiary = await findDiaryById(diaryId);
    const title = findDiary[0].diary_title;
    const content = findDiary[0].diary_content;
    const result = await appDataSource.query(
      `UPDATE diary SET diary_title = ? , diary_content = ? WHERE user_id = ? AND diary_title = ? AND diary_content = ? AND id = ?`,
      [newTitle, newContent, userId, title, content, diaryId]
    );
    return result;
  } catch (error) {
    console.error("다이어리 수정 중 오류", error);
    throw error;
  }
};

const deleteDiary = async (userId, diaryId) => {
  try {
    const result = await appDataSource.query(
      `DELETE FROM diary WHERE user_id = ? AND id = ?`,
      [userId, diaryId]
    );
    return result;
  } catch (error) {
    console.error("다이어리 삭제 중 오류", error);
    throw error;
  }
};

module.exports = {
  insertDiary,
  selectDiary,
  updateDiary,
  deleteDiary,
};
