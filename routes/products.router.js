const express = require("express");
const router = express.Router();
const { Product } = require("../models/product.model");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const products = await Product.find({});
      res.json({ success: true, products });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "unable to get products",
        errorMessage: err.message,
      });
    }
  })
  .post(async (req, res) => {
    try {
      const product = req.body;
      console.log(product);
      const NewProduct = new Product(product);
      const savedProduct = await NewProduct.save();
      res.json({ success: true, product: savedProduct });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "unable to add products",
        errorMessage: err.message,
      });
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) {
        return res
          .status(400)
          .json({ success: false, message: "product not found" });
      }
      res.json({ product });
    } catch {
      res
        .status(400)
        .json({ success: false, message: "could not retrieve product " });
    }
  })
  .post(async (req, res) => {
    try {
      const { id } = req.params;
      const updateProduct = req.body;
      const product = await Product.findByIdAndUpdate(id, updateProduct, {
        new: true,
      });
      if (product) {
        res.json({ product });
      } else {
        res.status(400).json({ success: false, message: "product not found" });
      }
    } catch (error) {
      res
        .status(400)
        .json({ success: false, message: "could not update product" });
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndDelete(id);
      if (product) {
        res.json({ success: true, deletedProduct: product });
      } else {
        res.status(400).json({ success: false, message: "product not found" });
      }
    } catch (error) {
      res
        .status(400)
        .json({ success: false, message: "could not delete product" });
    }
  });

module.exports = router;
