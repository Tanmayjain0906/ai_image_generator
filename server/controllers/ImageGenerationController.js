const FormData = require("form-data");
const { findUserWithUserId, reduceCreditBalance } = require("../models/userModel");
const axios = require("axios");

const imageGenerationController = async (req, res) => {
    const userId = req.user.id;
    const { prompt } = req.body

    try {
        const userDb = await findUserWithUserId(userId);

        if (!userDb) {
            return res.send({
                success: false,
                status: 404,
                message: "User Not Found",
            })
        }

        if (!prompt) {
            return res.send({
                success: false,
                status: 400,
                message: "Prompt Required",
            })
        }

        if (userDb.creditBalance === 0 || userDb.creditBalance < 0) {
            return res.send({
                success: false,
                status: 402,
                message: "Insufficient Credit Balance",
                creditBalance: userDb.creditBalance,
            })
        }

        const formData = new FormData();
        formData.append("prompt", prompt);

        const { data } = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_APIKEY,
            },
            responseType: "arraybuffer"
        })

        const base64Image = Buffer.from(data, "binary").toString("base64");
        const resultImage = `data:image/png;base64,${base64Image}`;
        const newuserDb = await reduceCreditBalance(userId, userDb.creditBalance);

        return res.send({
            success: true,
            status: 201,
            message: "Image Generated Successfully",
            data: newuserDb,
            image: resultImage,
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

module.exports = imageGenerationController;