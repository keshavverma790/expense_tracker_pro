const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtManager = require("../../../managers/jwtManager");

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email) throw "Email is required!";
  if (!password) throw "Pasword is required!";

  const userModel = mongoose.model("users");

  const dbUser = await userModel.findOne({
    email: email,
  });

  if (!dbUser) throw "User doesn't exists!";

  const comparePassword = await bcrypt.compare(password, dbUser.password);
  if (!comparePassword) throw "Email and the password do not match!";
  const accessToken = jwtManager(dbUser);

  res.status(200).json({
    status: "successful",
    message: "User succesfullt logged in!",
    accessToken: accessToken,
  });
};

module.exports = userLogin;
