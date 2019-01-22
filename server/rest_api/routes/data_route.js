const express = require("express");
const dataRouter = express.Router();

// focus on going back and forth, worry about data saving later

const Product = require("../models/data_model");

function findDocs(limitRecords, lastKnownId) {
  if(lastKnownId) {
    return Product.find({"_id": {$gt: lastKnownId}}, null).limit(limitRecords)
  }
  return Product.find({}, null).limit(limitRecords)
}

dataRouter
  .route("/catalog_count")
  .get(function(req, res, next) {
    Product.count({})
        .then((count) => {
          res.status(200).json({count})
        })
        .catch(err => {
          console.log(err)
          res.status(404).json({ error: "Error getting the count of products" })
        });
  });

dataRouter
  .route("/catalog")
  .post(function(req, res, next) {
    let limitRecords = req.body.limitRecords
    let lastKnownId = req.body.lastKnownId || null
    console.log(req.body)
    findDocs(limitRecords, lastKnownId)
      .then(function(docs){
        const data = {}
        console.log(docs.length)
        // update last record id for reference
        if(docs.length != 0) {
          lastKnownId = docs[docs.length-1]["_id"]
          data.lastKnownId = lastKnownId
          console.log(lastKnownId)
        }
        
        data.records = docs
        
        res.status(200).json(data)
      })
      .catch(err => {
        console.log(err)
        res.status(404).json({ error: "Error retrieving the product" })
      });
  });

module.exports = dataRouter;
