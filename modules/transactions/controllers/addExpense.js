const mongoose = require("mongoose");
const validator = require("validator");

const addExpense = async (req, res) => {
  const transactionsModel = mongoose.model("transactions");
  const usersModel = mongoose.model("users");

  const { amount, remarks } = req.body;

  if (!amount) throw "Amount is required!";
  if (!remarks) throw "Remarks are required!";
  if (remarks.length < 5) throw "Remarks length should be greater than 5!";
  if (!validator.isNumeric(amount.toString()))
    throw "Amount should be a number!";
  if (amount < 1) throw "Amount can't be negative!";

  await transactionsModel.create({
    user_id: req.user._id,
    amount: amount,
    remarks: remarks,
    transaction_type: "expense",
  });

  await usersModel.updateOne(
    {
      _id: req.user._id,
    },
    {
      $inc: {
        balance: amount * -1,
      },
    },
    {
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "successful",
    message: "Expense added succesfully!",
  });
};

module.exports = addExpense;
