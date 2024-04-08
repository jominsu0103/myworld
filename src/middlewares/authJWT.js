const { verify } = require("../utils/auth");

const authJWT = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    const result = verify(token);
    console.log(result);
    console.log(`resultId: ${result.id}`);
    console.log(`resultEmail: ${result.email}`);
    if (result.ok) {
      req.id = result.id;
      req.email = result.email;
      next();
    } else {
      res.status(401).send({
        ok: false,
        message: result.message,
      });
    }
  }
};

module.exports = authJWT;
