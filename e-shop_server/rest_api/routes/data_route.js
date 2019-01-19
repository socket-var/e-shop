const express = require("express");
const dataRouter = express.Router();

const Product = require("../models/data_model");

dataRouter
  .route("/catalog_all")
  .get(function(req, res, next) {
    
    Promise.all([Product.count({}), Product.find({}, null, {limit: 5})])
      .then(function(response){
        const [count, docs] = response
        const data = {}
        data.num_records = count
        data.records = docs
        res.status(200).json(data)
      })
      .catch(err => res.status(404).json({ error: "Error retrieving the product" }));
  });

module.exports = dataRouter;
