

const swaggerJsdoc =require ('swagger-jsdoc')
const swaggerUi  = require ('swagger-ui-express')

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: " Grandeur API Documentation",
      version: "1.0.0",
      description: "API documentation for my Grandeur backend",
    },
    servers: [
      {
        url: "https://ecombackend-d0na.onrender.com", // Change to your real server URL
      },
    ],
  },

  // Path where your route files ./Router/*.js are located
  apis: ["./Router/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };