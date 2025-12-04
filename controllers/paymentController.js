const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config();
exports.initializePayment = async (req, res) => {
  const { email } = req.body;
  const order_id = uuidv4();

  try {
    //get the user
    const user = await prisma.user.findUnique({ where: { email } });

    //check if users does not exist and repond
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist!" });
    }


    //Get users cart
    const userCart = await prisma.cart.findUnique({
      where: { userid: parseInt(user.id) },
      include: { ProducCart: { include: { product: true } } },
    });
    //check if users cart does not exist and repond
    if (!userCart) {
      return res
        .status(400)
        .json({ success: false, message: "User cart does not exist!" });
    }
    const cartItems = userCart.ProducCart;

    // Calculate total price
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item?.product.price * (item.quantity || 1),
      0
    );

    const payload = {
      tx_ref: uuidv4(),
      amount: totalPrice,
      currency: "NGN",
      redirect_url:
      `${process.env.FRONTEND_URL}/verify-payment`,
      // redirect_url: 'https://your-app.com/payment-success', always remember to change

      customer: {
        email: user.email,
        name: user.name,
        phonenumber: user.phone,
      },

      meta: {
     
        userid: user.id,
        order_id,
        
      },

      customizations: {
        title: "Grandeur",
        description: "Payment",
      },
    };

    const response = await fetch("https://api.flutterwave.com/v3/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.status !== "success") {
      return res
        .status(500)
        .json({ success: false, message: "Somthing went wrong!" });
    }

    return res.status(201).json({
      success: true,
      message: "Payment initialized successfully!",
      link: data.data.link,
      order_id,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Somthing went wrong!" });
  }
};

exports.verifyPayment = async (req, res) => {
  console.log('start')

  const { transaction_id } = req.query
  // const { order_id, email } = req.body

 

  console.log('Flutterwave redirect data:', req.query)

  if (!transaction_id) {
    return res.status(400).json({ message: 'Missing transaction_id' })
  }

  try {
    const response = await fetch(
      `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY
}`
        }
      }
    )

    const data = await response.json()
    console.log('data:', data)

    const id = Number(data?.data?.meta?.userid)
    console.log('id', id)
    const order_id = data?.data?.meta?.order_id


    const amount = data?.data?.amount
    const status = data?.data?.status

    //Find user
    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'User does not exist in Database!' })
    }

    //find users cart
    const userCart = await prisma.cart.findUnique({
      where: { userid: id },
      include: { ProducCart: { include: { product: true } } }
    })

    if (!userCart) {
      return res.status(400).json({
        success: false,
        message: 'User cart does not exist in Database!'
      })
    }

    //check for existing reciept
    const existingReciept = await prisma.receipt.findFirst({
      where: { orderId: order_id }
    })

    if (existingReciept) {
      return res
        .status(400)
        .json({ success: false, message: 'Reciept already Exist in Database!' })
    }

    const newRecipt = await prisma.receipt.create({
      data: {
        orderId: order_id,
        userId: id,
        name: `${user.firstname} ${user.lastname}`,
        email: user.email,
        phone: user.phone,
        amount: amount,
        transactionId: transaction_id,
        status: status
      }
    })

    if (!newRecipt) {
      return res
        .status(400)
        .json({ success: false, message: 'Unable to generate recipt!' })
    }

    const cartItems = await prisma.receiptItem.createMany({
      data: userCart.ProducCart.map(item => ({
        receiptId: newRecipt.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
        total: item.quantity * item.product.price,
        productId: item.productid
      }))
    })

    const updatedReciept = await prisma.receipt.findFirst({
      where: { orderId: order_id },
      include: { receiptItems: true }
    })

    return res.status(200).json({
      success: true,
      message: 'Payment successful',
      data: updatedReciept
    })
  } catch (error) {
    console.log('eror', error.message)

    return res.status(500).json({ error: error.message })
  }
}