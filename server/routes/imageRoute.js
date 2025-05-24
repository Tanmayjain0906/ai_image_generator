const express = require("express");

const imageRouter = express.Router();

const imageGenerationController = require("../controllers/ImageGenerationController");
const isAuth = require("../middlewares/isAuth");

imageRouter.post("/generate-image", isAuth, imageGenerationController);

module.exports = imageRouter;

