const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function generateToken(user) {
  try {
    const { firstname, lastname, email, phone, image, address , role, id } = user;

  if (!firstname) {
    return res.status(400).json({
      success: false,
      message: "Missing firstname feild!",
    });
  }
  if (!lastname) {
    return res.status(400).json({
      success: false,
      message: "Missing lastname feild!",
    });
  }
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Missing email feild!",
    });
  }
  if (!phone) {
    return res.status(400).json({
      success: false,
      message: "Missing phone feild!",
    });
  }
  if (!address) {
    return res.status(400).json({
      success: false,
      message: "Missing address feild!",
    });
  }
 if (!id) {
    return res.status(400).json({
      success: false,
      message: "Missing ID feild!",
    });
  }

  const payload = {
    firstname,
    lastname,
    email,
    phone,
    address,
    image,
    role,
    userid : id
  };

  const options = {
    expiresIn: "2h",
  };

  return jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
  } catch (error) {
    console.log( "Error generating token", error.message);   
    throw error;
  }
}

module.exports = generateToken;