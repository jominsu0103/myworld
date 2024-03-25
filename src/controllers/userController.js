const userService = require("../services/userService");

const signUp = async (req, res) => {
  try {
    const signUpResult = await userService.signUp(req.body);
    res.status(201).json(signUpResult);
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    const result = await userService.signIn(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const emailAuth = async (req, res) => {
  try {
    await userService.emailAuth(req.body);
    res.status(200).json({ message: "인증 메일을 전송했습니다" });
  } catch (error) {
    console.log(error);
    res.status(500).send("메일 전송 실패");
  }
};

const emailVerifyNumber = async (req, res) => {
  try {
    const result = await userService.emailVerifyNumber(req.body);
    if (result) {
      res.status(200).json({ message: "인증 및 비밀번호 변경 성공!" });
    } else {
      res.status(400).send("인증에 실패 했습니다!");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("SERVER_ISSUE");
  }
};

const phoneAuth = async (req, res) => {
  try {
    await userService.phoneAuth(req.body);
    res.status(200).json({ message: "인증번호를 성공적으로 전송했습니다!" });
  } catch (error) {
    console.log(error);
    res.status(500).send("인증 번호 전송에 실패했습니다");
  }
};

const phoneVerifyNumber = async (req, res) => {
  try {
    const result = await userService.phoneVerifyNumber(req.body);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).send("인증에 실패 했습니다!");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("SERVER_ISSUE");
  }
};

module.exports = {
  signUp,
  signIn,
  emailAuth,
  emailVerifyNumber,
  phoneAuth,
  phoneVerifyNumber,
};
