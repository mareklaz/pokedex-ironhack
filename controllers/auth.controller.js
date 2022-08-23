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
                    .then((userCreated) => {
                        console.log(userCreated); 
                        res.redirect('/login');
                    })
            }
        }) // then end
        .catch((err) => {
           console.log(err) 
           next(err);
        })
};

// Login


const login = (req, res, next, provider) => {
    passport.authenticate(provider || 'local-auth', (err, user, validations) => {
        if (err) {
            console.log('Error 🟢' + err);
            next(err);
        } else if (!user) {
            console.log('Status 🟡'+ user)
            res.status(404).render('auth/login', { errors: validations.error } );
        } else {
            req.login(user, (loginError) => {
                console.log('User success 🔴');
                if(loginError) {
                    console.log('login error 🔵');
                    next(loginError);
                } else {
                    console.log('entro aqui--------------------------------')
                    res.redirect('/profile');
                }
            })
        }
    })(req, res, next)
}

module.exports.login = (req, res, next) => {
    res.render("auth/login");
  };

module.exports.doLogin = (req, res, next) => {
    login(req, res, next);
}

module.exports.doLoginGoogle = (req, res, next) => {
    login(req, res, next, 'google-auth')
}

module.exports.logout = (req, res, next) => {
    req.session.destroy();
    res.redirect("/login");
  };