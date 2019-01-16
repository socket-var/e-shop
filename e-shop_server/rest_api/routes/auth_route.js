const express = require("express");
const authRouter = express.Router();
const User = require("../models/auth")


authRouter
    .route("/signup")
    // .get(getFunction)
    .post(postFunction)

function getFunction(req, res, next) {
    // get here
}

function postFunction(req, res, next) {
    // sign up form submit
    console.log(req.body)
    const saketh = new User({email:req.body.email, password: req.body.password})


    saketh.save(function(err) {
        if(err) return res.status(404).json({error: "Error saving the data"});
        // saved
        res.status(200).send("Sign-up Success");
    })
}

module.exports = authRouter;
