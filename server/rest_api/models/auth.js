const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const dbURL = `mongodb://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.AUTH_DB_NAME}`;


require("./db_connect")(dbURL);

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

userSchema.methods.createUser = function() {
    // new 
}

module.exports = mongoose.model("User", userSchema);

