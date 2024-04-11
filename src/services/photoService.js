const photoDao = require("../models/photoDao");
const auth = require("../utils/auth");
const secretKey = process.env.SECRET_KEY;

const uploadPhoto = async (req) => {
  const { folderId, photoName } = req.body;

  const photoURL = req.file.path;
  const photoFileName = req.file.filename;
  const userId = req.id;
  console.log(
    `folderID : ${folderId}, photoURL : ${photoURL} , photoName : ${photoName}`
  );

  const result = await photoDao.insertPhoto(
    userId,
    photoURL,
    photoName,
    folderId,
    photoFileName
  );

  return { message: "PHOTO_UPLOAD_SUCCESS", result };
};

const totalPhoto = async (req) => {
  const userId = req.id;
  const folderId = req.query.folderId;
  console.log(`userID : ${userId}, folderID : ${folderId}`);
  let folderQuery = "";
  if (folderId) {
    folderQuery = `AND folder_id = ${folderId}`;
  }

  const result = await photoDao.selectPhoto(userId, folderQuery);

  const processd = processData(result);

  console.log(processd);

  return processd;
};

const processData = (rawData) => {
  const processedData = rawData.map((item) => {
    return {
      id: item.id,
      folderId: item.folder_id,
      photo: item.photo,
      photoContent: item.photo_content,
      photoFileName: item.photo_file_name,
      scrap: item.scrap,
      userId: item.user_id,
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

const removePhoto = async (req) => {
  const token = req.headers.authorization;
  const photoId = req.body.photoId;
  const accessToken = auth.decoded(token, secretKey);
  const userId = accessToken.userId;

  const result = await photoDao.deletePhoto(userId, photoId);

  return { message: "PHOTO_DELETE_SUCCESS", result };
};

const incrementScrapCount = async (req) => {
  const photoId = req.query.photoId;
  console.log(`photoId: ${photoId}`);

  const result = await photoDao.incrementScrapCountInDB(photoId);

  return result;
};

module.exports = {
  uploadPhoto,
  totalPhoto,
  removePhoto,
  incrementScrapCount,
};