const passport = require('passport');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User.model');

passport.serializeUser((user, next) => {
    next(null, user.id);
})

passport.deserializeUser((id, next) => {
    User.findById(id)
        .then(user => {
            next(null, user);
        })
        .catch(err => {
            console.log('Error 🟨');
            next(err);
        })
})

passport.use('local-auth', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    (email, password, next) => {
        User.findOne({ email })
            .then((user) => {
                if (!user) {
                    next(null, false, {error: 'Invalid Credentials'});
                } else {
                    return user.checkPassword(password)
                        .then((match) => {
                            if(!match) {
                                next(null, false, {error: 'Invalid Credentials'});
                            } else {
                                next(null, user)
                            }
                        })
                }
            })
            .catch(err => next(err))
    }
))

