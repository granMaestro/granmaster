'use strict';
///////////////////////////////////////////////////////////////////////
///////////***********     llamo al esquema        ****///////////////
//////////////////////////////////////////////////////////////////////
let Pregunta = require('./../models/preguntaModel.js');

/////////////////////////////////////////////////////////////////////////////
////////******     creo la clase que hace los servicios        ****//////////
/////////////////////////////////////////////////////////////////////////////
class preguntaServices{
	constructor(){

	}
	get(callback){
		Pregunta.find({}).populate('CategoriaId').exec(callback)
	}
	getByPrueba(pruebaId, callback){
		Pregunta.find({pruebaId: pruebaId}).populate('CategoriaId').exec(callback)
	}
	create(pregunta, idUser, callback){
		var newPregunta = new Pregunta({
			titulo: pregunta.titulo,
			estado: pregunta.estado,
			CategoriaId: pregunta.CategoriaId,
			pruebaId: pregunta.pruebaId,
			usuarioId: idUser
		});
		newPregunta.save(callback)
	}
}

module.exports = new preguntaServices();