const appDataSource = require("../models/dataSource");

const createUser = async (
  email,
  hashedPassword,
  phoneNumberValue,
  nickname,
  normalizedBirthday
) => {
  try {
    const result = await appDataSource.query(
      `INSERT INTO users (
      email,
      password,
      phone_number,
      nickname,
      birthday
    )
    VALUES (?,?,?,?,?);
    `,
      [email, hashedPassword, phoneNumberValue, nickname, normalizedBirthday]
    );

    // 새로 만들어진 유저 아이디 반환(협의 필요)
    return result.insertId;
  } catch (error) {
    console.error("사용자 생성 중 오류:", error);
    throw error;
  }
};

const findUserByEmail = async (email) => {
  try {
    const result = await appDataSource.query(
      `SELECT * FROM users WHERE email = ?;`,
      [email]
    );
    return result;
  } catch (error) {
    console.error("이메일 조회 중 오류:", error);
    throw error;
  }
};

const findUserByPhonenumber = async (phoneNumber) => {
  console.log("유저 찾기:", phoneNumber);
  try {
    const result = await appDataSource.query(
      `SELECT * FROM users WHERE phone_number = ?;`,
      [phoneNumber]
    );
    return result;
  } catch (error) {
    console.error("전화번호 조회 중 오류:", error);
    throw error;
  }
};

const insertPhoneAuth = async (phoneNumber, number) => {
  try {
    const result = await appDataSource.query(
      `INSERT INTO auth_code (phone_number , auth_code) VALUES (?,?)`,
      [phoneNumber, number]
    );
    return result;
  } catch (error) {
    console.error("휴대폰 인증번호 insert:", error);
    throw error;
  }
};

const getAuthNumberByPhoneNumber = async (phoneNumber) => {
  try {
    const result = await appDataSource.query(
      `SELECT * FROM auth_code WHERE phone_number = ?`,
      [phoneNumber]
    );
    console.log("결과값:", result);
    if (result.length === 0) return null;
    return result[0].auth_code;
  } catch (error) {
    console.error("휴대폰 인증번호 조회 중 오류:", error);
    throw error;
  }
};

const deleteUserAuthNumberByPhoneNumber = async (phoneNumber) => {
  try {
    const result = await appDataSource.query(
      `DELETE FROM auth_code WHERE phone_number = ?`,
      [phoneNumber]
    );
    return result;
  } catch (error) {
    console.error("휴대폰 번호로 auth 삭제 중 오류:", error);
    throw error;
  }
};

const insertEmailAuth = async (email, number) => {
  try {
    const result = await appDataSource.query(
      `INSERT INTO auth_code (email , auth_code)
      VALUES (?,?)`,
      [email, number]
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAuthNumberByEmail = async (email) => {
  try {
    const result = await appDataSource.query(
      `SELECT auth_code FROM auth_code WHERE email = ?`,
      [email]
    );
    if (result.length === 0) return null;
    console.log("결과값:", result);
    return result[0].auth_code;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updatePassword = async (email, password) => {
  try {
    const result = await appDataSource.query(
      `UPDATE users SET password = ? WHERE email = ?`,
      [password, email]
    );
    console.log("이메일:", email, "패스워드:", password);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteUserAuthNumberByEmail = async (email) => {
  try {
    const result = await appDataSource.query(
      `DELETE FROM auth_code WHERE email = ?`,
      [email]
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserByPhonenumber,
  insertPhoneAuth,
  insertEmailAuth,
  getAuthNumberByEmail,
  getAuthNumberByPhoneNumber,
  deleteUserAuthNumberByEmail,
  deleteUserAuthNumberByPhoneNumber,
  updatePassword,
};
