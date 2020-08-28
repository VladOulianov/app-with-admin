const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    googleId:{
        type: String,
        required: false
    },
    displayName:{
        type: String,
        required: false
    },
    firstName:{
        type: String,
        required: false
    },
    lastName:{
        type: String,
        required: false
    },
    image:{
        type: String,
        
    },
    
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    date: {
        type:Date,
        default: Date.now
    }
})

// const userSchema = new Schema({
//   name:  String, // String is shorthand for {type: String}
//   username: String,
//   email:   String,
 
//   date: { type: Date, default: Date.now },
//   hidden: Boolean,
//   meta: {
//     votes: Number,
//     favs:  Number
//   }
// });
const User = mongoose.model('User', UserSchema);
module.exports = User;