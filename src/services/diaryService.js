const diaryDao = require("../models/diaryDao");

const insertDiary = async (req) => {
  const userId = req.id;
  const { title, content } = req.body;
  console.log(title, content);
  const result = await diaryDao.insertDiary(userId, title, content);

  return { message: "DIARY_ADD_SUCCESS", result };
};

const processData = (rawData) => {
  const processedData = rawData.map((item) => {
    return {
      id: item.id,
      diaryTitle: item.diary_title,
      diaryContent: item.diary_content,
      createdAt: formatDate(item.created_at),
    };
  });
  return processedData;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}, ${hours}:${minutes}:${seconds}`;
};

const selectDiary = async (req) => {
  const userId = req.id;
  const result = await diaryDao.selectDiary(userId);

  const processd = processData(result);

  return processd;
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
