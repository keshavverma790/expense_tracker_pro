const express = require("express");
const auth = require("../../middlewares/auth");
const addExpense = require("./controllers/addExpense");
const addIncome = require("./controllers/addIncome");
const getTransactions = require("./controllers/getTransactions");

const transactionRoutes = express.Router();

transactionRoutes.use(auth);

transactionRoutes.post("/addExpense", addExpense);
transactionRoutes.post("/addIncome", addIncome);
transactionRoutes.post("/getTransactions", getTransactions);

module.exports = transactionRoutes;
