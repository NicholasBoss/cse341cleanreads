const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Clean Reads API",
    description: "API for managing Books",
  },
  host: "localhost:3000",
  schemes: ["http"],
};
const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
