const express = require("express");


const uploads = require("../middlewares/uploads");
const { createProduct, getAllProduct, getSingleProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const { isAdmin, isUser } = require("../middlewares/auth");

const productRouter = express.Router();
/**
 * @swagger
 * /createProduct:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []   # isUser + isAdmin (JWT admin protected)
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - currency
 *               - sizes
 *               - defaultSize
 *               - colors
 *               - defaultColor
 *               - bestSeller
 *               - subcategory
 *               - rating
 *               - discount
 *               - newArrival
 *               - tags
 *               - categoryid
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Air Max 270"
 *               description:
 *                 type: string
 *                 example: "Premium running shoe with lightweight cushioning."
 *               price:
 *                 type: string
 *                 description: Price will be parsed to integer
 *                 example: "25000"
 *               currency:
 *                 type: string
 *                 example: "NGN"
 *               sizes:
 *                 type: string
 *                 description: Array stored as string (comma-separated or JSON)
 *                 example: '["S","M","L"]'
 *               defaultSize:
 *                 type: string
 *                 example: "M"
 *               colors:
 *                 type: string
 *                 example: '["Red","Black","White"]'
 *               defaultColor:
 *                 type: string
 *                 example: "Black"
 *               bestSeller:
 *                 type: string
 *                 example: "true"
 *               subcategory:
 *                 type: string
 *                 example: "Running Shoes"
 *               rating:
 *                 type: string
 *                 example: "4"
 *               discount:
 *                 type: string
 *                 example: "10"
 *               newArrival:
 *                 type: string
 *                 example: "true"
 *               tags:
 *                 type: string
 *                 example: '["men","sport"]'
 *               categoryid:
 *                 type: string
 *                 example: "3"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Product image file
 *     responses:
 *       201:
 *         description: Product created successfully
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
 *                   example: "product created successfully"
 *                 data:
 *                   type: object
 *       400:
 *         description: Missing fields or product already exists
 *       500:
 *         description: Internal server error
 */

productRouter.post("/createProduct", uploads.single("image") ,isUser,isAdmin, createProduct);
/**
 * @swagger
 * /getAllProduct:
 *   get:
 *     summary: Retrieve all products
 *     tags:
 *       - Product
 *     responses:
 *       200:
 *         description: Products retrieved successfully
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
 *                   example: "Products retrived successfully!"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Product object
 *       400:
 *         description: Failed to retrieve products
 *       500:
 *         description: Internal server error
 */

productRouter.get("/getAllProduct", getAllProduct);

/**
 * @swagger
 * /getSingleProduct/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     tags:
 *       - Product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product to retrieve
 *         example: 12
 *     responses:
 *       200:
 *         description: Product retrieved successfully
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
 *                   example: "Product retrived successfully!"
 *                 data:
 *                   type: object
 *       400:
 *         description: Missing or invalid product ID
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

productRouter.get("/getSingleProduct", getSingleProduct );

/**
 * @swagger
 * /updateProduct:
 *   patch:
 *     summary: Update an existing product
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []   # isUser + isAdmin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - values
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID of the product to update
 *                 example: 5
 *               values:
 *                 type: object
 *                 description: Fields to update
 *                 example:
 *                   name: "Updated Product Name"
 *                   price: 30000
 *                   description: "Updated product description"
 *     responses:
 *       200:
 *         description: Product updated successfully
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
 *                   example: "Product updated successfully!"
 *                 data:
 *                   type: object
 *       400:
 *         description: Product does not exist or invalid data
 *       500:
 *         description: Internal server error
 */

productRouter.patch("/updateProduct", isUser, isAdmin, updateProduct);

/**
 * @swagger
 * /deleteProduct:
 *   delete:
 *     summary: Delete a product by ID
 *     tags:
 *       - Product
 *     security:
 *       - bearerAuth: []   # isUser + isAdmin (JWT protected)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID of the product to delete
 *                 example: 10
 *     responses:
 *       200:
 *         description: Product deleted successfully
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
 *                   example: "Product deleted successfully!"
 *                 data:
 *                   type: object
 *       400:
 *         description: Product does not exist or request invalid
 *       500:
 *         description: Internal server error
 */

productRouter.delete("/deleteProduct",isUser, isAdmin, deleteProduct,);

module.exports = productRouter;