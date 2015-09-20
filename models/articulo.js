var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var articuloSchema = new Schema({
	nombre: { type: String, index: true },
	precio: { type: Number, inedx: true },
	imagen: { type: String, default: '/images/articulo-default.jpg', index: true },
	creado: { type: Date, default: Date.now, index: true },
	descripcion: { type: String, index: true },
});

var Articulo = mongoose.model('Articulo', articuloSchema)

module.exports = Articulo;