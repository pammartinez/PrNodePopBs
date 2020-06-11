'use strict';

const db = require('./lib/connectMongoose');
const Anuncio = require('./models/Anuncio');

db.once('open', async function () {
  try {
    await initAnuncios();
    return process.exit(0);
  } catch(err) {
    console.error('[Install DB]', err);
    return process.exit(1);
  }
});

async function initAnuncios() {

  await Anuncio.remove({});
  console.log('[Install DB]: Anuncios borrados');
  await Anuncio.insertMany([
    { nombre: 'Chocoflakes', venta: true, precio: 2.52, foto: 'chocoflakes.JPG', tags: ['lifestyle'] },
    { nombre: 'Coche', venta: false, precio: 60000, foto: 'moto.JPG', tags: ['motor'] },
    { nombre: 'Galletas', venta: true, precio: 2, foto: 'galletas.JPG', tags: ['lifestyle', 'work'] },
    { nombre: 'Iphone 11', venta: false, precio: 630, foto: 'iphone.JPG', tags: ['motor'] },
  ])
  console.log('[Install DB]: Añadidos');
}
