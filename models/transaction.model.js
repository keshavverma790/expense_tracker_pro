const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "User id is required!"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required!"],
    },
    transaction_type: {
      type: String,
      required: [true, "Transaction type is required!"],
      enum: ["income", "expense"],
    },
    remarks: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const transactionsModel = mongoose.model("transactions", transactionSchema);

module.exports = transactionsModel;
