const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const router = express.Router();
// User Model
const User = require("../models/userSchema");
const { forwardAuthenticated } = require("../config/auth");

// login page
router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

// Register page
router.get("/register", forwardAuthenticated, (req, res) =>
  res.render("register")
);

// Register Handle
router.post("/register", (req, res) => {
  // console.log(req.body);
  // res.send('register ok')
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // Check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }

  // Check password match
  if (password !== password2) {
    errors.push({ msg: "Password do not match" });
  }

  // Check pass length
  if (password.length < 6) {
    errors.push({ msg: "password should be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    //res.send('pass')
    // Validation passed
    User.findOne({ email: email }).then((user) => {
      if (user) {
        // user exists
        errors.push({ msg: "email is already registered" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });
        console.log(newUser);

        // Hash Password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // Set password to hashed
            newUser.password = hash;
            // save user
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered and can login"
                );
                res.redirect("/user/login");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});
// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/user/login',
      failureFlash: true
    })(req, res, next);
  });

// Logout Handle
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("Success_msg", "You are logged out");
  res.redirect("/user/login");
});

module.exports = router;
