const User = require('../models/User.model');
const mongoose = require('mongoose');


module.exports.register = (req, res, next) => {
    res.render('auth/register');
};

module.exports.doRegister = (req, res, next) => {
    const user = req.body

    User.findOne({ email: user.email })
        .then((userFound) => {
            if(userFound){
                console.log('This email is already exists')
            } else {
                return User.create(user)
                    .then((createdUser) => {
                        console.log(createdUser); 
                        res.redirect('/profile');
                    })
            }
        }) // then end
        .catch((err) => {
           console.log(err) 
           next();
        })
};

