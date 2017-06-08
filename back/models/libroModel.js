'use strict';


//////////////////////////////////////////////////////////////////////
///////////***********     llamo a moongoose        ****//////////////
//////////////////////////////////////////////////////////////////////
let mongoose = require('mongoose');
let Schema=mongoose.Schema;


//////////////////////////////////////////////////////////////////////////////
////////***********     creo el esquema / productos        ****///////////////
//////////////////////////////////////////////////////////////////////////////
let Libro = new Schema({
	titulo:String,
	autor:String,
	palabras:String,
	descripcion:String,
	estado:String,
	clase:String,
	precio:String,
	//genero:{type: Schema.Types.ObjectId, ref:"Genero"},
	categoria: {type: Schema.ObjectId, ref:'Categorias'},
	usuario: {type: Schema.ObjectId, ref:'User'},
})

//////////////////////////////////////////////////////////////////////////////
////////***********    exporto el esquema        ****/////////////////////////
//////////////////////////////////////////////////////////////////////////////
module.exports = mongoose.model('Libro', Libro)