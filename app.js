const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
// const errorHandler = require("./helpers/error-handler");

require("dotenv/config");

app.use(cors());
app.options("*", cors());

const api = process.env.API_URL; // environment variable
const productsRoutes = require("./routers/products");
const categoriesRoutes = require("./routers/categories");

// middlewares
app.use(express.json());
app.use(morgan("tiny"));
// app.use(errorHandler);

// routers
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);

// Database
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "gleno-database",
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

// Server
app.listen(3000, () => {
  console.log("server is running https://localhost:3000");
});
