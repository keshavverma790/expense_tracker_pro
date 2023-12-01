const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const resetPassword = async (req, res) => {
  const { email, new_password, reset_code } = req.body;
  const usersModel = mongoose.model("users");

  if (!email) throw "Email is required!";
  if (!new_password) throw "New password is required!";
  if (!reset_code) throw "Reset code is required!";
  if (new_password.length < 5) throw "password length should be more than 5";

  const dbUser = await usersModel.findOne({
    email: email,
  });
  if (!dbUser) throw "The email does not exist in the system!";
  if (dbUser.reset_code !== reset_code) throw "Reset code does not match!";

  const hashedPassword = await bcrypt.hash(new_password, 12);

  await usersModel.updateOne(
    {
      email: email,
      reset_code: reset_code,
    },
    {
      password: hashedPassword,
      reset_code: "",
    },
    {
      runValidators: true,
    }
  );

  await emailManager(
    email,
    "Your password has been changed successfully!",
    "Password change success"
  );

  res.status(200).json({
    status: "successful",
    message: "Password changed succesfully!",
  });
};

module.exports = resetPassword;
