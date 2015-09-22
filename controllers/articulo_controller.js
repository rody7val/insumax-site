var models = require('../models/models.js');
var nodemailer = require("nodemailer");
var mailer = nodemailer.createTransport();

// GET /articulos/
exports.index = function(req, res, next){
	models.Articulo.find({}, function(err, articulos){
		if (articulos) res.render('articulos/index.ejs', { articulos: articulos, errors: []});
		else if (err) throw err;
		else next(new Error('No se encontraron articulos :/'));
	});
}