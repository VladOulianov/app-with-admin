const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
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