const jwt = require("jsonwebtoken");
const { userRegistration, findUserWithEmail, creditBalance } = require("../models/userModel");
const { userValidation, isEmailValidate } = require("../utils/authUtils");
const bcrypt = require("bcrypt");

const userRegistratiionController = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        await userValidation({ email, password, username: name });
    } catch (error) {
        return res.send({
            success: false,
            status: 400,
            message: error,
            error: "Data Invalid",
        })
    }

    try {
        let userDb
        try {
            userDb = await userRegistration(name, email, password);
        } catch (error) {
            return res.send({
                success: false,
                status: 409,
                message: error,
            })
        }

        const token = jwt.sign({ id: userDb._id }, process.env.JWT_SECRET, { expiresIn: '2d' });

        return res.send({
            success: true,
            status: 201,
            message: "User Registered Successfully",
            data: userDb,
            token: token,
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


const findUserWithEmailController = async (req, res) => {
    const { email, password } = req.body;

    const isEmailValid = isEmailValidate({ key: email });

    if (!isEmailValid) {
        return res.send({
            success: false,
            status: 400,
            message: "Format of an email is incorrect",
        })
    }

    try {
        const userDb = await findUserWithEmail(email);
        if (!userDb) {
            return res.send({
                success: false,
                status: 404,
                message: "Invalid Email, User not found!",
            })
        }

        const userDbHashPassword = userDb.password;

        const isPasswordMatched = await bcrypt.compare(password, userDbHashPassword);

        if (!isPasswordMatched) {
            return res.send({
                success: false,
                status: 401,
                message: "Incorrect Password",
            })
        }

        const token = jwt.sign({ id: userDb._id }, process.env.JWT_SECRET, { expiresIn: '2d' });

        return res.send({
            success: true,
            status: 200,
            message: "Login Successfull",
            data: userDb,
            token: token,
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

const creditBalanceController = async (req, res) => {
    const userId = req.user.id;

    try {
        const userDb = await creditBalance(userId);

        return res.send({
            success: true,
            status: 200,
            data: userDb,
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





module.exports = { userRegistratiionController, findUserWithEmailController, creditBalanceController };