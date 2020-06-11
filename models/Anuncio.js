'use strict';

const mongoose = require('mongoose');
const fs = require('fs');
const flow = require('../lib/flowControl');
const configAnuncios = require('../local_config').anuncios;
const path = require('path');

const anuncioSchema = mongoose.Schema({
  nombre: String,
  venta: Boolean,
  precio: Number,
  foto: String,
  tags: [String]
});

// Lista de Etiquetas
anuncioSchema.statics.allowedTags = function () {
  return ['work', 'lifestyle', 'motor', 'mobile'];
};

anuncioSchema.statics.createRecord = function (nuevo, cb) {
  new Anuncio(nuevo).save(cb);
};

anuncioSchema.statics.list = async function(filters, startRow, numRows, sortField, includeTotal) {

  const query = Anuncio.find(filters);
  query.sort(sortField);
  query.skip(startRow);
  query.limit(numRows);

  const result = {};

  if (includeTotal) {
    result.total = await Anuncio.count();
  }
  result.rows = await query.exec();

  // poner ruta base a imagenes
  const ruta = configAnuncios.imagesURLBasePath;
  result.rows.forEach(r => r.foto = r.foto ? path.join(ruta, r.foto) : null);

  return result
};

var Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;
