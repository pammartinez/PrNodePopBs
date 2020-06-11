'use strict';

const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.Promise = global.Promise;

db.on('error', function (err) {
  console.error('[mongodb]:', err);
  process.exit(1);
});

db.once('open', function () {
  console.info('[mongodb]: Conectado!');
});

mongoose.connect('mongodb://localhost/nodepopdb');

module.exports = db;
