const express = require("express");
const {
  addToCart,
  getCart,
  updateCart,
  deleteCart,
} = require("../controllers/cartController");
const { isUser } = require("../middlewares/auth");
const cartRouter = express.Router();
/**
 * @swagger
 * /addcart:
 *   post:
 *     summary: Add an item to the user's cart
 *     description: >
 *       Adds a product to the authenticated user's cart.  
 *       The user must be logged in, and the request must include a valid JWT token  
 *       in the Authorization header using the Bearer token format.
 *     tags:
 *       - Cart
 *
 *     security:
 *       - bearerAuth: []   # Ensure you define bearerAuth in your Swagger config
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: integer
 *                 description: ID of the product being added to the cart.
 *                 example: 15
 *               quantity:
 *                 type: integer
 *                 description: Number of units to add.
 *                 example: 2
 *
 *     responses:
 *       200:
 *         description: Product successfully added to cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product added to cart
 *                 cartItem:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 32
 *                     productId:
 *                       type: integer
 *                       example: 15
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *                     userId:
 *                       type: integer
 *                       example: 7
 *
 *       400:
 *         description: Invalid input or missing required fields
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */

cartRouter.post("/addcart", isUser, addToCart);

/**
 * @swagger
 * /getcart/{userid}:
 *   get:
 *     summary: Retrieve a user's cart
 *     description: >
 *       Fetches all items currently stored in the authenticated user's cart.  
 *       The request must include a valid JWT token in the Authorization header  
 *       using the Bearer token format.
 *     tags:
 *       - Cart
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         description: The ID of the user whose cart is being retrieved.
 *         schema:
 *           type: integer
 *           example: 7
 *
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: integer
 *                   example: 7
 *                 items:
 *                   type: array
 *                   description: List of items currently in the cart.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 101
 *                       productId:
 *                         type: integer
 *                         example: 22
 *                       productName:
 *                         type: string
 *                         example: "Classic White Sneakers"
 *                       quantity:
 *                         type: integer
 *                         example: 2
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 49.99
 *                       total:
 *                         type: number
 *                         format: float
 *                         example: 99.98
 *
 *       400:
 *         description: Invalid user ID format
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       404:
 *         description: Cart not found for the specified user
 *       500:
 *         description: Server error
 */


cartRouter.get("/getcart/:userid", isUser, getCart);

/**
 * @swagger
 * /getcart/{userid}:
 *   get:
 *     summary: Retrieve a user's cart
 *     description: >
 *       Fetches all items currently stored in the authenticated user's cart.  
 *       The request must include a valid JWT token in the Authorization header  
 *       using the Bearer token format.
 *     tags:
 *       - Cart
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         description: The ID of the user whose cart is being retrieved.
 *         schema:
 *           type: integer
 *           example: 7
 *
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: integer
 *                   example: 7
 *                 items:
 *                   type: array
 *                   description: List of items currently in the cart.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 101
 *                       productId:
 *                         type: integer
 *                         example: 22
 *                       productName:
 *                         type: string
 *                         example: "Classic White Sneakers"
 *                       quantity:
 *                         type: integer
 *                         example: 2
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 49.99
 *                       total:
 *                         type: number
 *                         format: float
 *                         example: 99.98
 *
 *       400:
 *         description: Invalid user ID format
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       404:
 *         description: Cart not found for the specified user
 *       500:
 *         description: Server error
 */


cartRouter.patch("/updatecart", isUser, updateCart);
/**
 * @swagger
 * /deletecart/{userid}:
 *   delete:
 *     summary: Delete all items from a user's cart
 *     description: >
 *       Removes every item from the authenticated user's cart.  
 *       The request must include a valid JWT token in the Authorization header  
 *       using the Bearer token format.
 *     tags:
 *       - Cart
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         description: The ID of the user whose cart should be cleared.
 *         schema:
 *           type: integer
 *           example: 7
 *
 *     responses:
 *       200:
 *         description: Cart deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cart has been cleared
 *                 userId:
 *                   type: integer
 *                   example: 7
 *
 *       400:
 *         description: Invalid user ID format
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       404:
 *         description: Cart not found for this user
 *       500:
 *         description: Server error
 */

cartRouter.delete("/deletecart/:userid", isUser, deleteCart);

module.exports = cartRouter;
