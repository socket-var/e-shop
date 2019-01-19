const mongoose = require("mongoose");

require("../models/data_db_connect");

const dataSchema = new mongoose.Schema({
});


module.exports = mongoose.model("Product", dataSchema);