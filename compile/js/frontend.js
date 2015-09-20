var minimizar = function(argument) {
		return this;	
}
function minimizar_(arg){
  return this.argument;
}
/**
 *
 * @param {String} titulo
 * @param {agenda} inic
 * @return {agenda}
 */
function agenda(titulo, inic){
  var _titulo = titulo
  var _contenido = inic
  return {
    titulo: function(){
      return _titulo
    },
    meter: function(nombre, tf){
      _contenido[nombre] = tf
    },
    tf: function(nombre){
      return _contenido[nombre]
    },
    borrar: function(nombre){
      delete _contenido[nombre]
    },
    toJSON: function(){
      return JSON.stringify(_contenido)
    },
    listar: function(){
      //El método Object.keys() devuelve un arreglo de las propiedades enumerables de un objeto dado
      return Object.keys(_contenido).forEach(function(x){console.log(x+': '+_contenido[x]+'\n')})
    }
  }
}

var amigos = agenda("Amigos", { 
    Pepe: 113278561,
    José: 157845123,
    Jesús: 178512355
  })

amigos.listar()