'use strict';

///////////////////////////////////////////////////////////////////////
///////////***********     llamo al esquema        ****///////////////
//////////////////////////////////////////////////////////////////////
let Categoria = require('./../models/categoriaModel.js');

//////////////////////////////////////////////////////////////////////////////
////////******     creo la clase que hace los servicios        ****//////////
/////////////////////////////////////////////////////////////////////////////
class categoriaServices{
	constructor(){

	}
	get(callback){
		Categoria.find({}).populate('categoriaPadreId').exec(callback)
	}
	create(categoria, callback){
		var newCategoria = new Categoria({
			name: categoria.name,
			slug: categoria.slug,
			descripcion: categoria.descripcion,
			categoriaPadreId: categoria.PadreId,
		});
		newCategoria.save(callback)

	}
	modify(categoria, id, callback){
		Categoria.findByIdAndUpdate(id, {$set: {
                            'name'        : categoria.name,
                            'slug'        : categoria.slug,
                            'descripcion' : categoria.descripcion,
                            'updatedAt'   : new Date()
                        }}, callback)
		 
	}
	delete(id, callback){
	    Categoria.findById(id, function(err, categoria) {
	      categoria.remove(function(err, categoria) {
	        if(callback) callback(err, Categoria);
	      });
	    });
	}
}

module.exports = new categoriaServices();