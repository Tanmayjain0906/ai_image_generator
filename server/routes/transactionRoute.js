const express = require("express");
const isAuth = require("../middlewares/isAuth");
const {paymentRazorpayController, verifyPaymentController} = require("../controllers/transactionController");

const transactionRouter = express.Router();

transactionRouter.post("/pay-razor", isAuth, paymentRazorpayController);
transactionRouter.post("/verify-razor", verifyPaymentController);

module.exports = transactionRouter;