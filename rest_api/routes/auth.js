const express = require("express");
const authRouter = express.Router();
const User = require("../models/auth");
const bcrypt = require("bcryptjs");

authRouter.route("/signup").post(signupFunction);

authRouter.route("/login").post(loginFunction);

function signupFunction(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password)
  // execute only when doc.length != 0
  function rejectChain() {
    Promise.reject("Account with this email already exists").catch(function(
      err
    ) {
      res.status(401).send({ error: err });
    });
    return true;
  }

  function resolveChain(email, password) {
    bcrypt
      .genSalt(14)
      .then(bcrypt.hash.bind(null, password))
      // save user details to the db
      .then(function(hash) {
        const newUser = new User({ email, password: hash });

        newUser.save(function(err) {
          if (err) {
            return res.status(401).json({ error: "Signup failed" });
          }
          res.status(200).json({ message: "Signup success!" });
        });
      })
      .catch(function(err) {
        console.log(err);
        res
          .status(500)
          .send({ error: "Internal Server Error. Contact administrator" });
      });
  }

  // check if the user exists
  User.find({ email }).then(function(docs) {
    // if user exists call reject branch else register the user
    docs.length > 0 ? rejectChain() : resolveChain(email, password)
  });
}

function loginFunction(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

    function resolveChain(password, doc){
        bcrypt.compare(password, doc.password)
        .then(function(result) {
            if (result) {
              return res.status(200).json({ message: "Login Success" });
            }
            res.status(401).json({ message: "Email or password is incorrect" });
          })
          .catch(function(err) {
            res
              .status(500)
              .json({ error: "Internal Server Error. Contact Administrator" });
          });
    }

    function rejectChain() {
        Promise.reject("Your account does not exist, please register")
            .catch(function(err){
                res.status(401).json({error: err})
            });
    }

  User.findOne({ email })
    .then(function(doc) {
      Object.keys(doc).length == 0 ? rejectChain() : resolveChain(password, doc)
    })
   
}

module.exports = authRouter;
