const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    googleId: String,
    photo: String,
    googlePlusUrl: String
});

module.exports = mongoose.model('user', userSchema);