const mongoose = require("mongoose");
const emailManager = require("../../../managers/emailManager");

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const usersModel = mongoose.model("users");

  if (!email) throw "Provide email address to reset the password!";

  const dbUser = await usersModel.findOne({
    email: email,
  });

  if (!dbUser) throw "The email does not exist in the system!";

  reset_code = Math.floor(Math.random() * 90000) + 10000;

  await usersModel.updateOne(
    {
      email: email,
    },
    {
      reset_code: reset_code,
    },
    {
      runValidators: true,
    }
  );

  await emailManager(
    email,
    "Your code to reset the password is: " + reset_code,
    "Password reset request"
  );

  res.status(200).json({
    status: "successful",
    message: "Reset code sent to mail!",
  });
};

module.exports = forgotPassword;
