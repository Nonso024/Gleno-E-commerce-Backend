const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");

// MIDDLEWARE
app.use(bodyParser.json());
app.use(morgan("tiny"));

require("dotenv/config");

const api = process.env.API_URL; // environment variable

// http://localhost:3000/api/v1/products

app.get(`${api}/products`, (req, res) => {
  const product = {
    id: 1,
    name: "hair dresser",
    image: "some_url",
  };
  res.send(product);
});

app.post(`${api}/products`, (req, res) => {
  const newProd = req.body;
  console.log(newProd);
  res.send(newProd);
});

app.listen(3000, () => {
  console.log("server is running https://localhost:3000");
});
