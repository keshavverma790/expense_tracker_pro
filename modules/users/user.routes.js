const express = require("express");
const userRegistration = require("./controllers/userRegistration");
const userLogin = require("./controllers/userLogin");
const userDashboard = require("./controllers/userDashboard");
const auth = require("../../middlewares/auth");
const forgotPassword = require("./controllers/forgotPassword");
const resetPassword = require("./controllers/resetPassword");

const userRoutes = express.Router();

userRoutes.post("/userLogin", userLogin);
userRoutes.post("/userRegistration", userRegistration);
userRoutes.post("/forgotPassword", forgotPassword);
userRoutes.post("/resetPassword", resetPassword);

userRoutes.use(auth);

userRoutes.get("/userDashboard", userDashboard);

module.exports = userRoutes;
