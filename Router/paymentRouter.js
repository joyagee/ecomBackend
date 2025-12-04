const express = require("express");
const { initializePayment, verifyPayment } = require("../controllers/paymentController");
const { isUser } = require("../middlewares/auth");
const paymentRouter =  express.Router();

paymentRouter.post("/initialize-payment",isUser, initializePayment);
// paymentRouter.get("/verifypayment",isUser, verifyPayment); 
paymentRouter.get("/verify-payment", isUser, verifyPayment); 


module.exports = paymentRouter;
