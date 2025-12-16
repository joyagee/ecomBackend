const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function generateToken(user) {
  try {
    const { firstname, lastname, email, phone, image, address, role, id } = user;

    // Validate required fields
    if (!firstname || !lastname || !email || !phone || !address || !id) {
      throw new Error("Missing required user fields for token generation");
    }

    const payload = {
      firstname,
      lastname,
      email,
      phone,
      address,
      image,
      role,
      userId: id
    };

    const options = {
      expiresIn: "2h",
    };

    return jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
  } catch (error) {
    console.log("Error generating token", error.message);
    throw error;
  }
}

module.exports = generateToken;