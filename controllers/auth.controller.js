const User = require('../models/User.model');
const mongoose = require('mongoose');
const passport = require('passport');

// Register
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

// Login
module.exports.login = (req, res, next) => {
    res.render('auth/login');
}

const login = (req, res, next, provider) => {
    passport.authenticate(provider || 'local-auth', (err, user, validations) => {
        if (err) {
            console.log('Error 🟢' + err);
            next(err);
        } else if (!user) {
            console.log('Status 🟡')
            next.status(404).render('auth/login',{ errors: validations.error } );
        } else {
            req.login(user, (loginError) => {
                console.log('User error 🔴');
                if(loginError) {
                    console.log('login error 🔵');
                    next(loginError);
                } else {
                    res.redirect('/profile');
                }
            })
        }
    })
}

// module.exports.doLogin = (req, res, next) => {
    
// }