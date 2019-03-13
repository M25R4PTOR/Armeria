// --- IMPORTACIONES
const path     = require('path');
const express  = require('express');
const mongoose = require('mongoose');
const routes   = require('./routes');
const config   = require('./config');

const app      = express();

// --- CONEXIÓN A BASE DATOS
mongoose.connect(config.db_uri, { useNewUrlParser: true })
  .then(db   => console.log ('Conexión correcta a la BD'))
  .catch(err => console.log ('Error en la conexión a la BD'));

// --- MIDDLEWARE
// Para redirigir trafico HTTP a HTTPS
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https')
    res.redirect(`https://${req.header('host')}${req.url}`);
  else
    next();
});
// Resto de middleware
app.use(express.static(path.join(__dirname , 'public'))); // Archivos estáticos
app.use(express.json());                                  // Soporte de JSON
app.use('/api', routes);                                  // Rutas

// ---- PUERTO DE ESCUCHAb
app.listen (config.port, () => console.log(`Servidor iniciado en puerto ${config.port}`));
