const express = require("express");
const categoryRouter = express.Router()
const { createCategory, getAllCategory, deleteCategory, getSingleCategory, updateCategory} = require("../controllers/categoryController");

categoryRouter.post("/createCategory", createCategory);
categoryRouter.get("/getAllCategories", getAllCategory);
categoryRouter.get("/getSingleCategory", getSingleCategory);
categoryRouter.delete("/deleteCategory", deleteCategory);
categoryRouter.patch("/updatedCategory", updateCategory);

module.exports = { categoryRouter };

