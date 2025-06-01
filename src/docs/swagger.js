const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SecureFile API",
      version: "1.0.0",
      description: "API for encrypting, decrypting, and contact form",
    },
    servers: [
      {
        url: "https://encryption-decryption-l3jn.onrender.com",
        description: "Deployed server",
      },
      {
        url: "http://127.0.0.1:3500",
        description: "Development server",
      },
      
    ],
  },
  apis: ["./src/routes/*.js"], // path to route files with swagger comments
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
