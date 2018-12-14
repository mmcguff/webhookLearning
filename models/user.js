const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        minlength: 5,
        maxlength: 50,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 3,
        maxlength: 10,
        required: true,
    }
});

const User = mongoose.model('User', userSchema);

function validateUser(user){
    const schema = {
        username: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(5).max(1024).required()
    }

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;