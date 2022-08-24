const User = require('../models/User.model');
const mongoose = require('mongoose');
const passport = require('passport');

// Register
module.exports.register = (req, res, next) => {
    res.render('auth/register');
};

module.exports.doRegister = (req, res, next) => {
    const user = req.body
    
    if(req.file) {
        user.image = req.file.path;
    }

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
            next(err);
        } else if (!user) {
            res.status(404).render('auth/login', { errors: validations.error } );
        } else {
            req.login(user, (loginError) => {
                console.log('Login de' + user)
                if(loginError) {
                    next(loginError);
                } else {
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
    console.log('Login con Local')
    login(req, res, next);
}

module.exports.doLoginGoogle = (req, res, next) => {
    console.log('Login con Google')
    login(req, res, next, 'google-auth')
}

module.exports.logout = (req, res, next) => {
    req.session.destroy();
    res.redirect("/login");
  };