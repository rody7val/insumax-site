var path = require('path');

//Cargar Modelo ORM
var mongoose = require('mongoose');

//Usar BBDD MongoDB
mongoose.connect('mongodb://localhost/sc');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

//importar tabla Articulo
var Articulo = require('./articulo');

//exportar tabla Articulo
exports.Articulo = Articulo;

//solo si la tabla esta vacía la inicializo
if (Articulo.count() === 0) {
	//Nueva instancia
	var first_articulo = new Articulo({
		nombre: 'Lavandina x5L',
		precio: 43,
		descripcion: 'Lavandina ropa blanca.'
	});
	//save
	first_articulo.save(function (err){
		if (err) throw err;
		console.log('first articulo successfully!')
	})
};