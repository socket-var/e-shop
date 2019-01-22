const mongoose = require("mongoose");

const dbURL = `mongodb://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@${
    process.env.DB_HOST
  }/${process.env.DATA_DB_NAME}`;

require("./db_connect")(dbURL);

const dataSchema = new mongoose.Schema({
});


module.exports = mongoose.model("Product", dataSchema);