var express = require('express');
var router = express.Router();

var articuloController = require('../controllers/articulo_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'InsuMAX', errors: [] });
});

// Definicion de rutas /articulos
router.get('/articulos', articuloController.index);

module.exports = router;