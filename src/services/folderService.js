const folderDao = require("../models/folderDao");
const auth = require("../utils/auth");
const secretKey = process.env.SECRET_KEY;

const makeFolder = async (req) => {
  const token = req.headers.authorization;
  console.log(`token : ${token}`);
  const folderName = req.body.name;
  console.log(`folderName : ${folderName}`);
  const accessToken = auth.decoded(token, secretKey);
  console.log(accessToken);
  const userId = accessToken.userId;
  console.log(`userId : ${userId}`);
  const result = await folderDao.insertFolder(folderName, userId);

  return { message: "FOLDER_ADD_SUCCESS", result };
};

const readFolder = async (req) => {
  const token = req.headers.authorization;
  const accessToken = auth.decoded(token, secretKey);
  const userId = accessToken.userId;
  const result = await folderDao.selectFolder(userId);

  return { message: "FOLDER_READ_SUCCESS", result };
};

const updateFolder = async (req) => {
  const folderName = req.body.folderName;
  const newFolderName = req.body.newFolderName;
  const token = req.headers.authorization;
  const accessToken = auth.decoded(token, secretKey);
  const userId = accessToken.userId;
  const result = await folderDao.updateFolder(
    userId,
    folderName,
    newFolderName
  );

  return { message: "FOLDER_UPDATE_SUCCESS", result };
};

const deleteFolder = async (req) => {
  const folderName = req.body.folderName;
  const token = req.headers.authorization;
  const accessToken = auth.decoded(token, secretKey);
  const userId = accessToken.userId;
  const result = await folderDao.deleteFolder(userId, folderName);

  return { message: "FOLDER_DELETE_SUCCESS", result };
};

module.exports = {
  makeFolder,
  readFolder,
  updateFolder,
  deleteFolder,
};
