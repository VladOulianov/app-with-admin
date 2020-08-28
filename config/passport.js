// const LoaclStrategy = require('passport-local').Strategy;
// //const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')

// // Load User Model
// const User = require('../models/userSchema')


// module.exports = function(passport) {
//     passport.use(
//         new LoaclStrategy({usernamefield: 'email'}, (email, password, done)=>{
//             // Match User
//             User.findOne({ email: email})
//             .then(user =>{
//                 if(!user){
//                     return done(null, false, {message: 'That email is not registered'})
//                 }
                
//                 // Match Password 
//                 bcrypt.compare(password, user.password, (err, isMatch)=>{
//                     if(err) throw err;

//                     if(isMatch){
//                         return done(null, user);
//                     } else {
//                         return done(null, false,  {message: 'password incorect'})
//                     }

//                 });

//             })
//             .catch(err=> console.log(err))
//         })
//     )
//     passport.serializeUser(function(user, done) {
//         done(null, user.id);
//       });
    
//       passport.deserializeUser(function(id, done) {
//         User.findById(id, function(err, user) {
//           done(err, user);
//         });
//       });
// }
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
//const GoogleStrategy = require('passport-google-oauth20').Strategy
//const mongoose = require('mongoose')

// Load User model
const User = require('../models/userSchema');

module.exports = function(passport) {
  
  passport.use(
    // Local AUTH
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
    
  );
    
    

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};



