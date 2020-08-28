const express = require('express');
const router = express.Router();
const passport = require('passport')
//const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// router.get('/',forwardAuthenticated,(req, res)=> res.render("home"))
router.get('/google', passport.authenticate('google', {scope:['profile']}))




router.get('/google/callback',passport.authenticate('google', {failureRedirect:'/'}), (req, res)=>{
    res.redirect('/dashboard')
}
);

module.exports = router;

