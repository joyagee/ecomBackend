const express = require("express");
const { initializePayment, verifyPayment } = require("../controllers/paymentController");
const { isUser } = require("../middlewares/auth");
const paymentRouter =  express.Router();



/**
 * @swagger
 * /initialize-payment:
 *   post:
 *     summary: Initialize a payment for the authenticated user
 *     tags:
 *       - Payment
 *     security:
 *       - bearerAuth: []   # isUser middleware (JWT authentication)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user making the payment
 *                 example: "john@example.com"
 *     responses:
 *       201:
 *         description: Payment initialized successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Payment initialized successfully!
 *                 link:
 *                   type: string
 *                   description: Payment link provided by Flutterwave
 *                   example: "https://checkout.flutterwave.com/v3/hosted/pay/12345"
 *                 order_id:
 *                   type: string
 *                   description: Generated order ID for the transaction
 *                   example: "88c01d36-7af6-4f37-af20-7de3f0dbfa55"
 *       400:
 *         description: User not found or cart not found
 *       500:
 *         description: Server error while initializing payment
 */


paymentRouter.post("/initialize-payment",isUser, initializePayment);
// paymentRouter.get("/verifypayment",isUser, verifyPayment); 

/**
 * @swagger
 * /registerUser:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: User registered successfully
 */

/**
 * @swagger
 * /addcart:
 *   post:
 *     summary: Add item to cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Item added to cart successfully
 */

/**
 * @swagger
 * /getcart/{userid}:
 *   get:
 *     summary: Get cart items for a user
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 */

/**
 * @swagger
 * /updatecart:
 *   patch:
 *     summary: Update cart items
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Cart updated successfully
 */

/**
 * @swagger
 * /deletecart/{userid}:
 *   delete:
 *     summary: Delete user's cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart deleted successfully
 */

/**
 * @swagger
 * /createCategory:
 *   post:
 *     summary: Create a new category
 *     tags:
 *       - Category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
 */

/**
 * @swagger
 * /getAllCategories:
 *   get:
 *     summary: Retrieve all categories
 *     tags:
 *       - Category
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 */

/**
 * @swagger
 * /getSingleCategory:
 *   get:
 *     summary: Retrieve a single category
 *     tags:
 *       - Category
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 */

/**
 * @swagger
 * /deleteCategory:
 *   delete:
 *     summary: Delete a category
 *     tags:
 *       - Category
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 */

/**
 * @swagger
 * /verify-payment:
 *   get:
 *     summary: Verify payment
 *     tags:
 *       - Payment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: paymentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment verified successfully
 */

paymentRouter.get("/verify-payment", isUser, verifyPayment); 


module.exports = paymentRouter;
