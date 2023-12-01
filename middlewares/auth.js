const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    const jwt_payLoad = await jwt.verify(accessToken, process.env.jwt_salt);
    req.user = jwt_payLoad;
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: "Unauthorised!",
    });
    return;
  }
  next();
};

module.exports = auth;
