//imports
const express = require('express'); //importando express
const morgan = require('morgan'); // para ver peticiones del cliente
const app = express(); //app - modulo de express
const { mongoose } = require('./database'); //solo el módulo de mongoose
const cors = require('cors');


//settings
app.set('port', process.env.PORT || 3000); //generalizacion del puerto

//middleware
app.use(morgan('dev')); //mostrar en entorno de dev 
app.use(express.json()); //servidor entiende formato json
app.use(cors());


//routes
app.use('/api/registrarse', require('./routes/usuarios.routes'));
app.use('/api/carpetas', require('./routes/carpetas.routes'));

//start
app.listen(app.get('port'), () => { console.log('encendido', app.get('port')) });