require("express-async-errors");

const express = require("express");
const cors = require("cors")
const errorHandler = require("./handlers/errorHandler");
const mongoose = require("mongoose");
const userRoutes = require("./modules/users/user.routes");
const transactionRoutes = require("./modules/transactions/transactions.routes");

//configuring the .env file
require("dotenv").config();

const app = express();
app.use(cors());

//connecting the Node app to MongoDB
mongoose
  .connect(process.env.mongo_connection)
  .then(() => {
    console.log("MongoDB connected succesfully!");
  })
  .catch(() => {
    console.log("MongoDB connection failed!");
  });

//intialising the models
require("./models/user.model");
require("./models/transaction.model");

app.use(express.json());

//routing
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

//routes which are not defined
app.all("*", (req, res) => {
  res.status(404).json({
    status: "Page not found!",
  });
});

//error handling
app.use(errorHandler);

//listening to the port 8000
app.listen("8000", () => {
  console.log("Connected to the server succesfully!");
});
