var express = require('express');
var router = express.Router();

/* GET home page. */
router
  .route("/foo")
  .get(function(req, res, next) {
    res.status(200).json({ text: 'Hello from the server' });
});

module.exports = router;
