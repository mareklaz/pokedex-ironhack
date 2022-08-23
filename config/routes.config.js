const router = require('express').Router();

const miscController = require('../controllers/misc.controller');
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

// Misc
router.get('/', miscController.home); // Renderizamos la pagina de inicio

// Auth > Register
router.get('/register', authController.register); // Renderiza la vista de formulario de registro
router.post('/register', authController.doRegister); // Envia la información de register form al controlador.
// Auth > Login
router.get('/login', authController.login); // Renderizar la vista de login
router.post('/login', authController.doLogin); // Envia la información de login form al controlador

// User
router.get('/profile', userController.user);

module.exports = router;
