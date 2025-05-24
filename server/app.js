const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const imageRouter = require("./routes/imageRoute");
const transactionRouter = require("./routes/transactionRoute");

const app = express();


require("./config/mongodb");


app.use(cors({
    origin: 'https://ai-image-generator-beta-eight.vercel.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true 
}));


app.use(express.json());


app.use("/user", userRouter);
app.use("/image", imageRouter);
app.use("/transaction", transactionRouter);


app.get("/", (req, res) => {
    return res.send("API Working");
});

module.exports = app;
