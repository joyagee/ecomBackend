const express = require("express")

const { loginUser, registerUser} = require("../controllers/userController");
const uploads = require("../middlewares/uploads");

const userRouter =  express.Router();

userRouter.post("/registerUser", uploads.single("image"), registerUser);
userRouter.post("/loginUser", loginUser);

module.exports = userRouter;

