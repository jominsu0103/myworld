const folderDao = require("../models/folderDao");
const auth = require("../utils/auth");
const secretKey = process.env.SECRET_KEY;

const makeFolder = async (req) => {
  const folderName = req.body.folderName;
  const userId = req.id;
  console.log(`folder: ${folderName} , userId: ${userId}`);
  const result = await folderDao.insertFolder(folderName, userId);

  return { message: "FOLDER_ADD_SUCCESS", result };
};

const readFolder = async (req) => {
  const userId = req.id;
  console.log(userId);
  const result = await folderDao.selectFolder(userId);

  const processd = processData(result);

  return processd;
};

const processData = (rawData) => {
  const processedData = rawData.map((item) => {
    return {
      id: item.id,
      userId: item.user_id,
      folderName: item.name,
      createdAt: new Date(item.created_at).toISOString(),
    };
  });

  return processedData;
};

const updateFolder = async (req) => {
  const oldFolderName = req.body.oldFolderName;
  const newFolderName = req.body.newFolderName;
  const folderId = req.query.folderId;
  console.log(`folderId: ${folderId}`);
  const userId = req.id;
  const result = await folderDao.updateFolder(
    userId,
    oldFolderName,
    newFolderName,
    folderId
  );

  return { message: "FOLDER_UPDATE_SUCCESS", result };
};

const deleteFolder = async (req) => {
  const folderName = req.body.folderName;
  const userId = req.id;
  const result = await folderDao.deleteFolder(userId, folderName);

  return { message: "FOLDER_DELETE_SUCCESS", result };
};

module.exports = {
  makeFolder,
  readFolder,
  updateFolder,
  deleteFolder,
};
