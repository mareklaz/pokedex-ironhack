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
        User.findOne({ email }) // Busca el usuario por email
            .then((user) => { // Recibe respuesta de la busqueda
                if (!user) {
                    next(null, false, {error: 'Invalid Credentials'}); // No encuentra al usuario
                } else { // Encuentra al usuario
                    return user.checkPassword(password) // Comprueba la contraseña
                        .then((match) => { 
                            if(!match) {
                                next(null, false, {error: 'Invalid Credentials'}); // Contraseña no coincide
                            } else {
                                next(null, user); // Contraseña coincide, login OK
                            }
                        })
                }
            })
            .catch(err => next(err));
    }
))

