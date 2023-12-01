const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtManager = require("../../../managers/jwtManager");
const emailManager = require("../../../managers/emailManager");

const userRegistration = async (req, res) => {
  const { name, password, email, balance } = req.body;
  const usersModel = mongoose.model("users");

  if (!name) throw "Full name is required!";
  if (!password) throw "Password is required!";
  if (!email) throw "Email is required!";
  if (password.length <= 5) throw "Password length should be greater than 5!";

  const user = await usersModel.findOne({
    email: email,
  });

  if (user) throw "User already exists!";

  const hashedPassword = await bcrypt.hash(password, 12);

  const createdUser = await usersModel.create({
    name: name,
    password: hashedPassword,
    email: email,
    balance: balance,
  });

  const accessToken = jwtManager(createdUser);

  await emailManager(
    email,
    "Welcome to the Expense Tracker PRO! You are succesfully registered!",
    "Registration Successful"
  );

  res.status(201).json({
    status: "successful",
    message: "User registered succesfully!",
    accessToken: accessToken,
  });
};

module.exports = userRegistration;
