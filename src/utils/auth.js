const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = process.env.SECRET_KEY;
const { promisify } = require("util");
const redisClient = require("./redis");

//token 만들기
const generateToken = (user) => {
  const payload = { email: user.email, id: user.id };

  return jwt.sign(payload, secretKey, {
    algorithm: "HS256",
    expiresIn: "1h",
  });
};

//디코딩 token
const verify = (token) => {
  let decoded = null;
  try {
    decoded = jwt.verify(token, secretKey);
    return {
      ok: true,
      id: decoded.id,
      email: decoded.email,
    };
  } catch (error) {
    return {
      ok: false,
      message: error.message,
    };
  }
};

//refresh token 만들기
const refresh = () => {
  return jwt.sign({}, secretKey, {
    algorithm: "HS256",
    expiresIn: "14d",
  });
};

const getAsync = (key) => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, reply) => {
      if (err) {
        reject(err);
      } else {
        resolve(reply);
      }
    });
  });
};

const refreshVerify = async (token, userId) => {
  try {
    console.log(userId);
    const data = await getAsync(userId.toString());

    if (token === data) {
      try {
        jwt.verify(token, secretKey);
        return true;
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

//hash 만들기
const makeHash = async (password, saltRounds) => {
  return bcrypt.hash(password, saltRounds);
};

//hash 검증
const checkHash = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

//이메일 형식 정규식
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

//패스워드 정규식
const validatePassword = (password) => {
  const passwordRegex = /^.{10,}$/;
  return passwordRegex.test(password);
};

module.exports = {
  generateToken,
  verify,
  refresh,
  refreshVerify,
  makeHash,
  checkHash,
  validateEmail,
  validatePassword,
};
