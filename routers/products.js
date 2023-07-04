const express = require("express");
const router = express.Router();
const { Product } = require("../models/product");
const { Category } = require("../models/category");

router.get(`/`, async (req, res) => {
  const productList = await Product.find();

  //check for error
  if (!productList) {
    res.status(500).json({
      success: false,
    });
  }
  res.send(productList);
});

router.post(`/`, async (req, res) => {
  const category = await Category.findById(req.params.category);
  if (!category) {
    return res.status(400).send("Invalid Category");
  }

  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });

  product = await product.save();

  if (!product) {
    return res.status(500).send(`The product can't be initialized`);
  }

  res.status(200).send(product);
});

module.exports = router;
