const { io } = require('../index');

const Band = require('../models/band');
const Bands = require('../models/bands');


const bands = new Bands();

bands.addBand(new Band('Mago de Öz'));
bands.addBand(new Band('Saurom'));
bands.addBand(new Band('Lépoca'));
bands.addBand(new Band('SFDK'));


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });


    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);

        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => {
        const newBand = new Band(payload.newBandName);
        bands.addBand(newBand);

        io.emit('active-bands', bands.getBands());
    });
});