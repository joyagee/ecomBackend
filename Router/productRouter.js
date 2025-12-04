const express = require("express");


const uploads = require("../middlewares/uploads");
const { createProduct, getAllProduct, getSingleProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const { isAdmin, isUser } = require("../middlewares/auth");

const productRouter = express.Router();

productRouter.post("/createProduct", uploads.single("image") ,isUser,isAdmin, createProduct);
productRouter.get("/getAllProduct", getAllProduct);
productRouter.get("/getSingleProduct", getSingleProduct );
productRouter.patch("/updateProduct", isUser, isAdmin, updateProduct);
productRouter.delete("/deleteProduct",isUser, isAdmin, deleteProduct,);

module.exports = productRouter;