const mongoose = require('mongoose'); // Para crear DB
const bcrypt = require('bcrypt'); // Para encriptar la contraseña del usuario
//const { user } = require('../controllers/user.controller');

const EMAIL_PATTERN =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /^.{8,}$/i;
const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [EMAIL_PATTERN, 'Email is not valid'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        match: [PASSWORD_PATTERN, 'Password is not valid'],

    },
    image: {
        type: String,
        default: './images/user-default.png'
    }

})

userSchema.pre('save', function (next) {
    const user = this;

    if (user.isModified('password')) {
        bcrypt
            .hash(user.password, SALT_ROUNDS)
            .then((hash) => {
                user.password = hash;
                next();
            })
            .catch(err => next(err));
    } else {
        next();
    }
})

userSchema.methods.checkPassword = function(password) {
    const user = this;
    return bcrypt.compare(password, user.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;