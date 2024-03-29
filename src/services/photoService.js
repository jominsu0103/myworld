const photoDao = require("../models/photoDao");
const auth = require("../utils/auth");
const secretKey = process.env.SECRET_KEY;

const uploadPhoto = async (req) => {
  const token = req.headers.authorization;
  const { folderId, photoURL, photoName } = req.body;
  const accessToken = auth.decoded(token, secretKey);
  const userId = accessToken.userId;

  const result = await photoDao.insertPhoto(
    userId,
    photoURL,
    photoName,
    folderId
  );

  return { message: "PHOTO_UPLOAD_SUCCESS", result };
};

const totalPhoto = async (req) => {
  const token = req.headers.authorization;
  const accessToken = auth.decoded(token, secretKey);
  const userId = accessToken.userId;

  const result = await photoDao.selectPhoto(userId);

  return { message: "PHOTO_RELOAD_SUCCESS", result };
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
