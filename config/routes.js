const router = require('express').Router();

const miscController = require('../controllers/misc.controller');
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller')

// Misc
router.get('/', miscController.home);

// Auth > Register
router.get('/register', authController.register) // renedrizar la vista de formulario de registro
router.post('/register', authController.doRegister) //enviar la info del form al controlador que a su misma vez lo enviará a la database DB
// Auth > Login
router.get('/login', authController.login) // Renderizar la vista de login
//router.post('/login', authController.doLogin) // Envia la información de login al controlador

// User
router.get('/profile', userController.user)

module.exports = router; // ???
