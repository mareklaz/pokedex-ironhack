const mongoose = require('mongoose'); // Para crear DB
const bcrypt = require('bcrypt'); // Para encriptar la contraseña del usuario



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    image: {
        type: String,
        default: './images/user-default.png'
    }

})

const User = mongoose.model('User', userSchema)
module.exports = User;