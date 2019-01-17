const express = require("express");
const dataRouter = express.Router();

const Product = require("../models/data_model");

dataRouter.route("/").get(function(req, res, next) {
  Product.findOne({}, function(err, doc) {
    if (err) {
      return res.status(404).json({ error: "Error reteriving the product" });
    }
    res.status(200).json(doc);
  });
});

module.exports = dataRouter;
