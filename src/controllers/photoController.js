const photoService = require("../services/photoService");

const uploadPhoto = async (req, res) => {
  try {
    const uploadPhotoResult = await photoService.uploadPhoto(req);
    res.status(201).json(uploadPhotoResult);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const totalPhoto = async (req, res) => {
  try {
    const totalPhotoResult = await photoService.totalPhoto(req);
    res.status(200).json(totalPhotoResult);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const removePhoto = async (req, res) => {
  try {
    const removePhotoResult = await photoService.removePhoto(req);
    res.status(200).json(removePhotoResult);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

module.exports = {
  uploadPhoto,
  totalPhoto,
  removePhoto,
};
