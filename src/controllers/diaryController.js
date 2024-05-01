const diaryService = require("../services/diaryService");

const insertDiary = async (req, res) => {
  try {
    const insertDiary = await diaryService.insertDiary(req);
    res.status(201).json({
      message: "New diary creation successful",
      data: insertDiary,
    });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const selectDiary = async (req, res) => {
  try {
    const selectDiary = await diaryService.selectDiary(req);
    res.status(200).json({
      message: "Successful retrieval of diary list",
      data: selectDiary,
    });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const updateDiary = async (req, res) => {
  try {
    const updateDiary = await diaryService.updateDiary(req);
    res.status(201).json({
      message: "Diary modification successful",
      data: updateDiary,
    });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const deleteDiary = async (req, res) => {
  try {
    const deleteDiary = await diaryService.deleteDiary(req);
    res.status(200).json({
      message: "Diary deletion successful",
      data: deleteDiary,
    });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

module.exports = {
  insertDiary,
  selectDiary,
  updateDiary,
  deleteDiary,
};
