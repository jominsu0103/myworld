const folderService = require("../services/folderService");

const makeFolder = async (req, res) => {
  try {
    const makefolderResult = await folderService.makeFolder(req);
    res.status(201).json(makefolderResult);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const readFolder = async (req, res) => {
  try {
    const readFolderResult = await folderService.readFolder(req);
    res.status(200).json({ message: "read success", data: readFolderResult });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const updateFolder = async (req, res) => {
  try {
    const updateFolderResult = await folderService.updateFolder(req);
    res.status(200).json(updateFolderResult);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const deleteFolder = async (req, res) => {
  try {
    const deleteFolderResult = await folderService.deleteFolder(req);
    res.status(200).json(deleteFolderResult);
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

module.exports = {
  makeFolder,
  readFolder,
  updateFolder,
  deleteFolder,
};
