const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Clean Reads API",
    description: "API for managing Books",
  },
  host: "cse341cleanreads.onrender.com",
  schemes: ["https"],
};
const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
