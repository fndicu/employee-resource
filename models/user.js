const mongoose = require('mongoose');

//User Schema set-up
const userSchema = new mongoose.Schema({
    name: String,
    password: String
});

//building the user model 
module.exports = mongoose.model('User', userSchema);