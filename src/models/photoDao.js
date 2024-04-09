const appDataSource = require("./dataSource");

const insertPhoto = async (
  userId,
  photoURL,
  photoName,
  folderId,
  photoFileName
) => {
  try {
    const result = await appDataSource.query(
      `
      INSERT INTO photo (user_id , photo , photo_content , folder_id , photo_file_name) VALUES (?,?,?,?,?);
      `,
      [userId, photoURL, photoName, folderId, photoFileName]
    );
    return result;
  } catch (error) {
    console.error("사진 업로드 중 오류", error);
    throw error;
  }
};

const selectPhoto = async (userId, folderQuery) => {
  try {
    const result = await appDataSource.query(
      `
    SELECT * FROM photo WHERE user_id = ? ${folderQuery}
    `,
      [userId]
    );
    return result;
  } catch (error) {
    console.error("사진 불러오는 중 오류", error);
    throw error;
  }
};

const deletePhoto = async (userId, photoId) => {
  try {
    const result = await appDataSource.query(
      `DELETE FROM photo WHERE user_id = ? AND id = ?`,
      [userId, photoId]
    );
    return result;
  } catch (error) {
    console.error("사진 삭제 중 오류", error);
    throw error;
  }
};

const incrementScrapCountInDB = async (photoId) => {
  try {
    const result = await appDataSource.query(
      `UPDATE photo SET scrap = scrap + 1 WHERE id = ?`,
      [photoId]
    );
    return result;
  } catch (error) {
    console.error("스크랩 수 증가 중 오류", error);
    throw error;
  }
};

module.exports = {
  insertPhoto,
  selectPhoto,
  deletePhoto,
  incrementScrapCountInDB,
};
