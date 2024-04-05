const photoDao = require("../models/photoDao");
const auth = require("../utils/auth");
const secretKey = process.env.SECRET_KEY;

const uploadPhoto = async (req) => {
  const token = req.headers.authorization;
  const { folderId, photoName } = req.body;

  const photoURL = req.file.path;
  const photoFileName = req.file.filename;
  const accessToken = auth.decoded(token, secretKey);
  const userId = accessToken.userId;
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
  const token = req.headers.authorization;
  const accessToken = auth.decoded(token, secretKey);
  const userId = accessToken.userId;

  const result = await photoDao.selectPhoto(userId);

  return result;
};

const removePhoto = async (req) => {
  const token = req.headers.authorization;
  const photoId = req.body.photoId;
  const accessToken = auth.decoded(token, secretKey);
  const userId = accessToken.userId;

  const result = await photoDao.deletePhoto(userId, photoId);

  return { message: "PHOTO_DELETE_SUCCESS", result };
};

module.exports = {
  uploadPhoto,
  totalPhoto,
  removePhoto,
};
