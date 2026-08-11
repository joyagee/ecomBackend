const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./Router/userRouter");
const { categoryRouter } = require("./Router/categoryRouter");
const productRouter = require("./Router/productRouter");
const cartRouter = require("./Router/cartRouter");
const paymentRouter = require("./Router/paymentRouter");
const cors = require("cors");
const { swaggerUi, swaggerSpec } = require("./swagger/swagger");
dotenv.config();
const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:3000",
      ];
      // Allow all vercel.app domains
      if (!origin || allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PATCH", "DELETE"],
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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

//Start server
app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
