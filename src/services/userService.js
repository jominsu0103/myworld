const userDao = require("../models/userDao");
const throwError = require("../utils/error");
const auth = require("../utils/auth");
const nodemailer = require("nodemailer");
const coolsms = require("coolsms-node-sdk");
const redisClient = require("../utils/redis");
const mailPoster = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_POSTER,
    pass: process.env.MAIL_PASS,
  },
});

const signUp = async (data) => {
  const { email, password, phoneNumberValue, nickname, birthday } = data;

  if (!email || !phoneNumberValue || !nickname) {
    throwError("All fields must be filled.", 400);
  }
  const existingUser = await userDao.findUserByEmail(email);
  if (existingUser.length > 0) {
    throwError("ALREADY_EXIST_USER", 400);
  }
  const normalizedBirthday = birthday.includes("---") ? null : birthday;

  const saltRounds = 12;
  const hashedPassword = await auth.makeHash(password, saltRounds);
  await userDao.createUser(
    email,
    hashedPassword,
    phoneNumberValue,
    nickname,
    normalizedBirthday
  );
  return { message: "SIGN_UP_SUCCESS" };
};

const signIn = async (data) => {
  const { email, password } = data;

  if (!email || !password) {
    throwError("INVALID_ATTEMPT", 400);
  }

  const user = await userDao.findUserByEmail(email);
  if (!user) {
    throwError("NON_EXISTENT_USER", 400);
  }

  const isPasswordValid = auth.checkHash(password, user[0].password);
  if (!isPasswordValid) {
    throwError("Entered password is not valid.", 400);
  }
  console.log(user);
  const accessToken = auth.generateToken(user[0]);
  const refreshToken = auth.refresh();

  await redisClient.set(user[0].id.toString(), refreshToken);

  return {
    message: "LOG_IN_SUCCESS",
    data: {
      accessToken,
      refreshToken,
    },
  };
};

const phoneAuth = async ({ phoneNumber }) => {
  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const number = randomNumber(111111, 999999);
  const existingUser = await userDao.findUserByPhonenumber(phoneNumber);
  if (!existingUser) {
    throwError("NON_EXISTENT_USER", 404);
  }

  const sendMessage = async () => {
    const SMS_KEY = process.env.API_KEY;
    const SMS_SECRET = process.env.API_SECRET;
    const SMS_SENDER = process.env.PHONE_NUMBER;

    const mySms = coolsms.default;
    const messageService = new mySms(SMS_KEY, SMS_SECRET);
    const result = await messageService.sendOne({
      to: phoneNumber,
      from: SMS_SENDER,
      text: `안녕하세요 cyworld 입니다! 요청하신 인증번호는 ${number}입니다.`,
    });
  };
  await userDao.insertPhoneAuth(phoneNumber, number);
  await sendMessage();
};

const phoneVerifyNumber = async (data) => {
  const { phoneNumber, verificationCode } = data;
  const authNumber = await userDao.getAuthNumberByPhoneNumber(phoneNumber);
  if (verificationCode != authNumber) {
    throwError("인증 번호가 일치하지 않습니다.", 400);
  }

  const user = await userDao.findUserByPhonenumber(phoneNumber);
  //await userDao.deleteUserAuthNumberByPhoneNumber(phoneNumber);
  return {
    message: "FIND_ID_SUCCESS",
    email: user[0].email,
  };
};

const emailAuth = async (data) => {
  try {
    const number = generateRandomNumber();
    const mailOption = {
      from: process.env.MAIL_POSTER,
      to: data.email,
      subject: "cyworld 인증 관련 메일 입니다.",
      html: `<h1> 인증번호를 확인 후 홈페이지에서 입력해 주세요 </h1><h1>${number}</h1>`,
    };

    await mailPoster.sendMail(mailOption);
    await userDao.insertEmailAuth(data.email, number);
  } catch (error) {
    console.error("Email authentication failed:", error.message);
    throw new Error("Email authentication failed");
  }
};

const emailVerifyNumber = async (data) => {
  try {
    const authNumber = await userDao.getAuthNumberByEmail(data.email);
    if (data.verificationCode != authNumber) {
      throw new Error("Authentication failed");
    }

    const saltRounds = 12;
    const hashedPassword = await auth.makeHash(data.newPassword, saltRounds);
    await userDao.updatePassword(data.email, hashedPassword);
    await userDao.deleteUserAuthNumberByEmail(data.email);

    return true;
  } catch (error) {
    throw new Error("Email verification and password change failed");
  }
};

const generateRandomNumber = () => {
  return Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
};

module.exports = {
  signUp,
  signIn,
  phoneAuth,
  phoneVerifyNumber,
  emailAuth,
  emailVerifyNumber,
};
