require('dotenv').config();

const express = require('express');
const hbs = require('hbs');
const logger = require('morgan')
const passport = require('passport');
const sessionConfig = require('./config/sessions.config');

require('./config/passport.config');
require('./config/db.config.js'); // requerir la base de datos!!

const app = express();

app.use(express.static('public')); // Generamos la ruta de public donde estarn los elementos estaticos
app.use(express.urlencoded({ extended: false })); // ??? 
app.use(logger('dev')); // ???

app.use(sessionConfig);

// Configuramos las rutas donde estarán las vistas de HBS
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

// Passport
app.use(passport.initialize());
app.use(passport.session());

hbs.registerPartials(__dirname + '/views/partials'); // Indicamos donde están los partials.

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

const routes = require('./config/routes.config'); // Requerimos el contenido de Routes
app.use(routes); // Usamos el routes 

app.use((req, res, next) => {
    next(console.log('404'));
})

const port = Number(process.env.PORT || 3000);

app.listen(port, () => {
    console.log('Listening on port ' + port);
});