const passport = require('passport');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

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
                    console.log("NO ENCUENTRA AL USUARIO!!!!!!!!!!!!!!!!!!!!!")
                    next(null, false, {error: 'Invalid Credentials'}); // No encuentra al usuario
                } else { // Encuentra al usuario
                    console.log("si ENCUENTRA AL USUARIO!!!!!!!!!!!!!!!!!!!!!")
                    return user.checkPassword(password) // Comprueba la contraseña
                        .then((match) => { 
                            if(!match) {
                                console.log("NO ES LA MISMA PASSWORD DEL USUARIO!!!!!!!!!!!!!!!!!!!!!")
                                next(null, false, {error: 'Invalid Credentials'}); // Contraseña no coincide
                            } else {
                                console.log("todo en orden, manda el user!!!!!!!!!!!!!!!!!!!!!")
                                    next(null, user)
                            }
                        })
                }
            })
            .catch(err => {
                next(err);
        });
    }
))

passport.use('google-auth', new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, next) => {
        const googleID = profile.id;
        const email = profile.emails[0] ? profile.emails[0].value : undefined;
        const name = profile.displayName;
        const image = profile.photos[0].value;

        if (googleID && email){
            User.findOne({
                $or: [
                    { googleID },
                    { email }
                ]
            })
                .then(user => {
                    if (user) {
                        next(null, user);
                        return;
                    }
                return User.create({
                    email, 
                    googleID, 
                    password: mongoose.Types.ObjectId(),
                    name,
                    image
                }).then(createdUser => {
                    next(null, createdUser)
                })
            })
            .catch(err => next(err))
        } else {
            next(null, false, { error: 'Error connecting to Google Auth' })
        }
    }

))
