const razorpay = require("razorpay");
const { findUserWithUserId, updateUserProperty } = require("../models/userModel");
const { newTransaction, findTransactionByID, updateTransactionProperty } = require("../models/transactionModel");


const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})


const paymentRazorpayController = async (req, res) => {
    const userId = req.user.id;
    const { planId } = req.body;

    try {
        const userDb = await findUserWithUserId(userId);

        if (!userDb) {
            return res.send({
                success: false,
                status: 404,
                message: "User Not Found",
            })
        }

        if (!planId) {
            return res.send({
                success: false,
                status: 400,
                message: "Missing Details",
            })
        }

        let credits, plan, amount, date

        switch (planId) {
            case "Basic":
                credits = 100
                plan = "Basic"
                amount = 10
                break;
            case "Advanced":
                credits = 500
                plan = "Advanced"
                amount = 50
                break;
            case "Business":
                credits = 5000
                plan = "Business"
                amount = 500
                break;
            default:
                return res.send({
                    success: false,
                    status: 404,
                    message: "Plan Not Found",
                })
        }

        date = Date.now();

        const transactionData = {
            userId, credits, plan, amount, date
        }

        const transactionDb = await newTransaction(transactionData);

        const options = {
            amount: amount * 100,
            currency: process.env.CURRENCY,
            receipt: transactionDb._id,
        }

        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                return res.send({
                    success: false,
                    status: error.statusCode || 500,
                    error: error,
                    message: "Payment Gateway Error"
                })
            }
            return res.send({
                success: true,
                status: 200,
                order,
            })
        })
    } catch (error) {
        return res.send({
            success: false,
            status: 500,
            message: "Internal Server Error",
            data: error,
        })
    }
}

const verifyPaymentController = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        if (orderInfo.status === "paid") {
            const transactionDb = await findTransactionByID(orderInfo.receipt);

            if (transactionDb.payment) {
                return res.send({
                    success: false,
                    status: 402,
                    message: "Payment Failed!"
                })
            }

            const userDb = await findUserWithUserId(transactionDb.userId);

            const newCreditBalance = userDb.creditBalance + transactionDb.credits;
            await updateUserProperty(transactionDb.userId, { creditBalance: newCreditBalance });

            await updateTransactionProperty(transactionDb._id, { payment: true });

            return res.send({
                success: true,
                status: 200,
                message: "Payment Successfull",
            })
        }
        else {
            return res.send({
                success: false,
                status: 402,
                message: "Payment Failed!"
            })
        }

    } catch (error) {
        return res.send({
            success: false,
            status: 500,
            message: "Internal Server Error",
            data: error,
        })
    }
}

module.exports = { paymentRazorpayController, verifyPaymentController };