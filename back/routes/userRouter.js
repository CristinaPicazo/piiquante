const express = require("express");

const userRouter = express.Router();

// Controllers
const { signup, login } = require("../controllers/usersController");

// Routes
userRouter.post('/signup', signup);
userRouter.post('/login', login);

module.exports = { userRouter };

