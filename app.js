require('dotenv/config');

const express = require('express');
const hbs = require('hbs');
const logger = require('morgan')

const app = express();

app.use(express.static('public')); // Generamos la ruta de public donde estarn los elementos estaticos
app.use(express.urlencoded({ extended: false })); // ??? 
app.use(logger('dev')); // ???

// Configuramos las rutas donde estarán las vistas de HBS
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials'); // Indicamos donde están los partials.

const router = require('./config/routes'); // Requerimos el contenido de Routes

app.use('/', router) // Usamos el routes 

app.use((res, req, next) => {
    next(console.log('404'));
})

const port = Number(process.env.PORT || 3000);

app.listen(port, () => {
    console.log('Ready on ' + port)
});