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


/**
 * @swagger
 * /registerUser:
 *   post:
 *     summary: Register a new user
 *     description: >
 *       Creates a new user account.  
 *       This endpoint accepts both text fields and an optional profile image.  
 *       The image must be sent as multipart/form-data.
 *     tags:
 *       - User
 *
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's display name.
 *                 example: Agnes Ochayi
 *               email:
 *                 type: string
 *                 description: Valid email address.
 *                 example: agnes@example.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: StrongPass123!
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Optional profile image.
 *
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: Agnes Ochayi
 *                     email:
 *                       type: string
 *                       example: agnes@example.com
 *                     imageUrl:
 *                       type: string
 *                       example: https://yourserver.com/uploads/profile.png
 *
 *       400:
 *         description: Missing required fields or invalid data
 *       409:
 *         description: Email already registered
 *       500:
 *         description: Server error
 */


userRouter.post("/registerUser", uploads.single("image"), registerUser);
module.exports = userRouter;

