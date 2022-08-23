const router = require('express').Router();
const passport = require('passport')

const miscController = require('../controllers/misc.controller');
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const authMiddlewares = require("../middlewares/authMiddleware");

const SCOPES = [
    "profile",
    "email"
  ]

// Misc
router.get('/', miscController.home); // Renderizamos la pagina de inicio

// Auth > Register
router.get('/register', authController.register); // Renderiza la vista de formulario de registro
router.post('/register', authController.doRegister); // Envia la información de register form al controlador.
// Auth > Login
router.get('/login', authMiddlewares.isNotAuthenticated, authController.login); // Renderizar la vista de login, primero pasa por el Authentication
router.post('/login', authController.doLogin); // Envia la información de login form al controlador

// Auth with Google
router.get('/login/google', authMiddlewares.isNotAuthenticated, passport.authenticate('google-auth', { scope: SCOPES  }))
router.get('/auth/google/callback', authMiddlewares.isNotAuthenticated, authController.doLoginGoogle)

//Logout
router.get("/logout", authMiddlewares.isAuthenticated ,authController.logout);


// User
router.get('/profile', authMiddlewares.isAuthenticated, userController.user);

module.exports = router;