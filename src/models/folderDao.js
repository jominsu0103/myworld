const appDataSource = require("./dataSource");

const insertFolder = async (folderName, userId) => {
  try {
    const result = await appDataSource.query(
      `
    INSERT INTO folder (name , user_id) VALUES (?,?);
    `,
      [folderName, userId]
    );
    return result;
  } catch (error) {
    console.error("폴더 생성 중 오류", error);
    throw error;
  }
};

const selectFolder = async (userId) => {
  try {
    const result = await appDataSource.query(
      `SELECT * FROM folder WHERE user_id = ?`,
      [userId]
    );
    return result;
  } catch (error) {
    console.error("폴더 목록 불러오는 중 오류", error);
    throw error;
  }
};

const updateFolder = async (userId, oldFolderName, newFolderName, folderId) => {
  try {
    const result = await appDataSource.query(
      `UPDATE folder SET name = ? WHERE user_id = ? AND name = ? AND id = ?`,
      [newFolderName, userId, oldFolderName, folderId]
    );
    return result;
  } catch (error) {
    console.error("폴더 이름 수정 중 오류", error);
    throw error;
  }
};

const deleteFolder = async (userId, folderName) => {
  try {
    const result = await appDataSource.query(
      `DELETE FROM folder WHERE name = ? AND user_id = ?`,
      [folderName, userId]
    );
    return result;
  } catch (error) {
    console.error("폴더 삭제 중 오류", error);
    throw error;
  }
};

module.exports = {
  insertFolder,
  selectFolder,
  updateFolder,
  deleteFolder,
};
