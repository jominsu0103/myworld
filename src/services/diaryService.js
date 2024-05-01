const diaryDao = require("../models/diaryDao");

const insertDiary = async (req) => {
  const userId = req.id;
  const { title, content } = req.body;
  const result = await diaryDao.insertDiary(userId, title, content);

  return { message: "DIARY_ADD_SUCCESS", result };
};

const selectDiary = async (req) => {
  const userId = req.id;
  const result = await diaryDao.selectDiary(userId);

  return result;
};

const updateDiary = async (req) => {
  const userId = req.id;
  const diaryId = req.query.diaryId;
  const { newTitle, newContent } = req.body;
  const result = await diaryDao.updateDiary(
    newTitle,
    newContent,
    userId,
    diaryId
  );

  return result;
};

const deleteDiary = async (req) => {
  const userId = req.id;
  const diaryId = req.query.diaryId;
  const result = await diaryDao.deleteDiary(userId, diaryId);

  return result;
};

module.exports = {
  insertDiary,
  selectDiary,
  updateDiary,
  deleteDiary,
};
