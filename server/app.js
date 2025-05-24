const express = require("express");
const userRouter = require("./routes/userRoute");
const imageRouter = require("./routes/imageRoute");
const transactionRouter = require("./routes/transactionRoute");
const app = express();

require("./config/mongodb");


app.use(express.json());
app.use("/user", userRouter);
app.use("/image", imageRouter);
app.use("/transaction", transactionRouter);


app.get("/", (req,res) => {
    return res.send("Api Working");
})

module.exports = app;