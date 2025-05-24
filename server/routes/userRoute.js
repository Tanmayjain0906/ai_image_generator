const express = require("express");

const userRouter = express.Router();

const {userRegistratiionController, findUserWithEmailController, creditBalanceController} = require("../controllers/userControllers");
const isAuth = require("../middlewares/isAuth");

userRouter.post("/registration", userRegistratiionController);
userRouter.post("/login", findUserWithEmailController);
userRouter.get("/credit-balance",isAuth, creditBalanceController);

module.exports = userRouter;