const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Add to Cart (Upgraded)
// exports.addToCart = async (req, res) => {
//   console.log("reqbody:", req.body);

//   const { userid, productid, color, size, quantity } = req.body;
//   const parseduserid = parseInt(userid);
//   const parsedproductid = parseInt(productid);

//   try {
//     // find or create cart
//     const existingCart = await prisma.cart.upsert({
//       where: { userid: parseduserid },
//       update: {},
//       create: { userid: parseduserid },
//     });

//     // check product exists
//     const existingProduct = await prisma.product.findUnique({
//       where: { id: parsedproductid },
//     });

//     if (!existingProduct) {
//       return res.status(400).json({
//         success: false,
//         message: "Product does not exist in database!",
//       });
//     }

//     // check if item already exists
//     const existingCartItem = await prisma.producCart.findUnique({
//       where: {
//         productid_cartid: {
//           productid: parsedproductid,
//           cartid: existingCart.id,
//         },
//       },
//     });

//     let message;

//     if (existingCartItem) {
//       // update quantity instead of returning error
//       const newQty =
//         Number(existingCartItem.quantity || 0) +
//         (quantity ? Number(quantity) : 1);

//       await prisma.producCart.update({
//         where: {
//           productid_cartid: {
//             productid: parsedproductid,
//             cartid: existingCart.id,
//           },
//         },
//         data: {
//           quantity: newQty,
//           selectedcolor: color ? color : existingCartItem.selectedcolor,
//           selectedsize: size ? size : existingCartItem.selectedsize,
//         },
//       });

//       message = "Item already in cart, quantity updated";
//     } else {
//       // add item
//       await prisma.producCart.create({
//         data: {
//           product: { connect: { id: parsedproductid } },
//           cart: { connect: { id: existingCart.id } },
//           selectedcolor: color || null,
//           selectedsize: size || null,
//           quantity: quantity ? Number(quantity) : 1,
//         },
//       });

//       message = "Item added to cart successfully";
//     }

//     // return updated cart
//     const userUpdatedCart = await prisma.cart.findUnique({
//       where: { userid: parseduserid },
//       include: {
//         ProducCart: {
//           include: { product: true },
//         },
//       },
//     });

//     res.status(200).json({
//       success: true,
//       message: message,
//       data: userUpdatedCart,
//     });
//   } catch (error) {
//     console.log("error in addToCart =>", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

// backend cart controller
exports.addToCart = async (req, res) => {
  console.log("reqbody:", req.body);

  const { userid, productid, color, size, quantity } = req.body;
  
  // 🚨 CORRECTION: Robust Validation and Parsing 🚨
  const parseduserid = parseInt(userid, 10);
  const parsedproductid = parseInt(productid, 10);

  if (isNaN(parseduserid)) {
    console.error("Invalid userid received:", userid);
    return res.status(400).json({
      success: false,
      message: "Validation Error: User ID is invalid or missing.",
    });
  }

  if (isNaN(parsedproductid)) {
    console.error("Invalid productid received:", productid);
    return res.status(400).json({
      success: false,
      message: "Validation Error: Product ID is invalid or missing.",
    });
  }
  // ---------------------------------------------

  try {
    // find or create cart
    const existingCart = await prisma.cart.upsert({
      // parseduserid is now guaranteed to be an integer (or NaN, which we handled above)
      where: { userid: parseduserid }, 
      update: {},
      create: { userid: parseduserid },
    });

    // check product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: parsedproductid },
    });

    if (!existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Product does not exist in database!",
      });
    }

    // check if item already exists
    const existingCartItem = await prisma.producCart.findUnique({
      where: {
        productid_cartid: {
          productid: parsedproductid,
          cartid: existingCart.id,
        },
      },
    });

    let message;

    if (existingCartItem) {
      // update quantity instead of returning error
      const newQty =
        Number(existingCartItem.quantity || 0) +
        (quantity ? Number(quantity) : 1);

      await prisma.producCart.update({
        where: {
          productid_cartid: {
            productid: parsedproductid,
            cartid: existingCart.id,
          },
        },
        data: {
          quantity: newQty,
          selectedcolor: color ? color : existingCartItem.selectedcolor,
          selectedsize: size ? size : existingCartItem.selectedsize,
        },
      });

      message = "Item already in cart, quantity updated";
    } else {
      // add item
      await prisma.producCart.create({
        data: {
          product: { connect: { id: parsedproductid } },
          cart: { connect: { id: existingCart.id } },
          selectedcolor: color || null,
          selectedsize: size || null,
          quantity: quantity ? Number(quantity) : 1,
        },
      });

      message = "Item added to cart successfully";
    }

    // return updated cart
    const userUpdatedCart = await prisma.cart.findUnique({
      where: { userid: parseduserid },
      include: {
        ProducCart: {
          include: { product: true },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: message,
      data: userUpdatedCart,
    });
  } catch (error) {
    console.log("error in addToCart =>", error);
    // Send a 400 error if it's a known validation issue, otherwise 500
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update Cart (Upgraded)
exports.updateCart = async (req, res) => {
  const {
    userid,
    productid,
    quantity,
    size,
    color,
    selectedsize,
    selectedcolor,
  } = req.body;

  const parseduserid = parseInt(userid);
  const parsedproductid = parseInt(productid);

  try {
    const userCart = await prisma.cart.findUnique({
      where: { userid: parseduserid },
    });

    if (!userCart) {
      return res.status(400).json({
        success: false,
        message: "Cart does not exist for this user!",
      });
    }

    const whereComposite = {
      productid_cartid: {
        productid: parsedproductid,
        cartid: userCart.id,
      },
    };

    const cartItem = await prisma.producCart.findUnique({
      where: whereComposite,
    });

    if (!cartItem) {
      return res.status(400).json({
        success: false,
        message: "Item does not exist in user cart!",
      });
    }

    // Delete when quantity <= 0
    if (quantity !== undefined && Number(quantity) <= 0) {
      await prisma.producCart.delete({ where: whereComposite });

      const userUpdatedCart = await prisma.cart.findUnique({
        where: { userid: parseduserid },
        include: {
          ProducCart: {
            include: { product: true },
          },
        },
      });

      return res.status(200).json({
        success: true,
        message: "Item removed from cart",
        data: userUpdatedCart,
      });
    }

    const payload = {};

    if (quantity !== undefined) payload.quantity = Number(quantity);
    if (size) payload.selectedsize = size;
    if (selectedsize) payload.selectedsize = selectedsize;
    if (color) payload.selectedcolor = color;
    if (selectedcolor) payload.selectedcolor = selectedcolor;

    if (Object.keys(payload).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields to update!",
      });
    }

    await prisma.producCart.update({
      where: whereComposite,
      data: payload,
    });

    const updatedCart = await prisma.cart.findUnique({
      where: { userid: parseduserid },
      include: {
        ProducCart: {
          include: { product: true },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: updatedCart,
    });
  } catch (error) {
    console.log("error =>", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete from Cart (Upgraded)
exports.deleteCart = async (req, res) => {
  const { userid } = req.params;
  const { productid } = req.body;

  const parseduserid = parseInt(userid);
  const parsedproductid = parseInt(productid);

  try {
    const existingCart = await prisma.cart.findUnique({
      where: { userid: parseduserid },
    });

    if (!existingCart) {
      return res.status(400).json({
        success: false,
        message: "User cart does not exist!",
      });
    }

    const whereComposite = {
      productid_cartid: {
        productid: parsedproductid,
        cartid: existingCart.id,
      },
    };

    const existingCartItem = await prisma.producCart.findUnique({
      where: whereComposite,
    });

    if (!existingCartItem) {
      return res.status(400).json({
        success: false,
        message: "Cart item does not exist!",
      });
    }

    await prisma.producCart.delete({ where: whereComposite });

    const userUpdatedCart = await prisma.cart.findUnique({
      where: { userid: parseduserid },
      include: {
        ProducCart: {
          include: { product: true },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Cart item deleted successfully",
      data: userUpdatedCart,
    });
  } catch (error) {
    console.log("error =>", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get Cart (Upgraded)
exports.getCart = async (req, res) => {
  const { userid } = req.params;
  const parseduserid = parseInt(userid);

  try {
    let userCart = await prisma.cart.findUnique({
      where: { userid: parseduserid },
      include: {
        ProducCart: {
          include: { product: true },
        },
      },
    });

    // Return an empty cart instead of throwing an error
    if (!userCart) {
      const newCart = await prisma.cart.create({
        data: { userid: parseduserid },
      });

      userCart = {
        ...newCart,
        ProducCart: [],
      };
    }

    res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      data: userCart,
    });
  } catch (error) {
    console.log("error =>", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
