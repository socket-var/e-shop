const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

require("./auth_db_connect");

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

userSchema.methods.createUser = function() {
    // new 
}

module.exports = mongoose.model("User", userSchema);

