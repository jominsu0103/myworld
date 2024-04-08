const { generateToken, verify, refreshVerify } = require("./auth");

const jwt = require("jsonwebtoken");
const userDao = require("../models/userDao");

const refresh = async (req, res) => {
  if (req.headers.authorization && req.headers.refresh) {
    const authToken = req.headers.authorization;
    const refreshToken = req.headers.refresh;

    const authResult = verify(authToken);

    const decoded = jwt.decode(authToken);

    if (decoded === null) {
      res.status(401).send({
        ok: false,
        message: "NO authorized",
      });
    }
    console.log(`decodedID : ${decoded.id}`);
    const refreshResult = refreshVerify(refreshToken, decoded.id);
    const user = await userDao.findUserByEmail(decoded.email);

    if (authResult.ok === false && authResult.message === "jwt expired") {
      if (refreshResult.ok === false) {
        res.status(401).send({
          ok: false,
          message: "NO authorized",
        });
      } else {
        const newAccessToken = generateToken(user[0]);

        res.status(200).send({
          ok: true,
          data: {
            accessToken: newAccessToken,
            refreshToken,
          },
        });
      }
    } else {
      res.status(400).send({
        ok: false,
        message: "Access token is not expired",
      });
    }
  } else {
    res.status(400).send({
      ok: false,
      message: "Access token and refresh token are need for refresh",
    });
  }
};

module.exports = refresh;
