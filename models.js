const mongoose = require('mongoose');

const Cliente  = mongoose.model('Cliente',  { nombre: String, apellidos: String , dni: String});
const Articulo = mongoose.model('Articulo', { nombre: String, precio: Number, descripcion: String, fecha: String});


// module.exports = Cliente;

module.exports =  {
    Cliente,
    Articulo
};
