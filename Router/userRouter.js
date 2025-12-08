const express = require("express")
const { loginUser, registerUser} = require("../controllers/userController");
const uploads = require("../middlewares/uploads");
const userRouter =  express.Router();


/**
 * @swagger
 * /loginUser:
 *   post:
 *     summary: User login
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
userRouter.post("/loginUser", loginUser);
userRouter.post("/registerUser", uploads.single("image"), registerUser);
module.exports = userRouter;

