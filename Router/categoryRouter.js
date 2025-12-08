const express = require("express");
const categoryRouter = express.Router()
const { createCategory, getAllCategory, deleteCategory, getSingleCategory, updateCategory} = require("../controllers/categoryController");
/**
 * @swagger
 * /createCategory:
 *   post:
 *     summary: Create a new product category
 *     description: >
 *       Adds a new category to the system.  
 *       The request must include the category name, while the description is optional.
 *     tags:
 *       - Category
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: The category name.
 *                 example: Electronics
 *               description:
 *                 type: string
 *                 description: Optional descriptive text about the category.
 *                 example: Devices, gadgets, and accessories.
 *
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category created successfully
 *                 category:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 3
 *                     name:
 *                       type: string
 *                       example: Electronics
 *                     description:
 *                       type: string
 *                       example: Devices, gadgets, and accessories.
 *
 *       400:
 *         description: Missing or invalid fields
 *       409:
 *         description: Category already exists
 *       500:
 *         description: Server error
 */

categoryRouter.post("/createCategory", createCategory);

/**
 * @swagger
 * /getAllCategories:
 *   get:
 *     summary: Retrieve all product categories
 *     description: >
 *       Returns a list of every category stored in the system.  
 *       Useful for populating dropdowns, filtering products, or managing inventory.
 *     tags:
 *       - Category
 *
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 5
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Electronics"
 *                       description:
 *                         type: string
 *                         example: "Devices, gadgets, and accessories."
 *
 *       500:
 *         description: Server error
 */


categoryRouter.get("/getAllCategories", getAllCategory);

/**
 * @swagger
 * /getSingleCategory:
 *   get:
 *     summary: Retrieve a single category by ID
 *     description: >
 *       Fetches the details of a specific category.  
 *       The category ID should be provided as a query parameter.
 *     tags:
 *       - Category
 *
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: The ID of the category to retrieve.
 *         schema:
 *           type: integer
 *           example: 3
 *
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 3
 *                 name:
 *                   type: string
 *                   example: "Electronics"
 *                 description:
 *                   type: string
 *                   example: "Devices, gadgets, and accessories."
 *
 *       400:
 *         description: Missing or invalid category ID
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */

categoryRouter.get("/getSingleCategory", getSingleCategory);
/**
 * @swagger
 * /deleteCategory:
 *   delete:
 *     summary: Delete a product category
 *     description: >
 *       Removes a single category from the system.  
 *       The category ID must be provided as a query parameter.
 *     tags:
 *       - Category
 *
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: The ID of the category to delete.
 *         schema:
 *           type: integer
 *           example: 4
 *
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category deleted successfully
 *                 deletedCategoryId:
 *                   type: integer
 *                   example: 4
 *
 *       400:
 *         description: Missing or invalid category ID
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */


categoryRouter.delete("/deleteCategory", deleteCategory);
/**
 * @swagger
 * /updatedCategory:
 *   patch:
 *     summary: Update an existing category
 *     tags:
 *       - Category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the category to update
 *                 example: "67a1234bcf9012d45ef67890"
 *               name:
 *                 type: string
 *                 description: New name of the category
 *                 example: "New Category Name"
 *               description:
 *                 type: string
 *                 description: Category description
 *                 example: "Updated description of the category"
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Bad request (missing fields or invalid data)
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */

categoryRouter.patch("/updatedCategory", updateCategory);

module.exports = { categoryRouter };

