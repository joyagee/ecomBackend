const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./Router/userRouter");
const { categoryRouter } = require("./Router/categoryRouter");
const productRouter = require("./Router/productRouter");
const cartRouter = require("./Router/cartRouter");
const paymentRouter = require("./Router/paymentRouter");
const cors = require("cors");
dotenv.config();
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://grandeur-lovat.vercel.app"],
    method: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

const port = process.env.PORT || 5000;
//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", productRouter);
app.use("/", cartRouter);
app.use("/", paymentRouter);
//Start server
app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
