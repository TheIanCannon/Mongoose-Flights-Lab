const mongoose = require('mongoose');
// shortcut variable
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['American', 'Southwest', 'United', ]
    },
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN', ],
        default: 'DEN',
    },
    flightNo: {
        type: Number,
        minLength: 10,
        maxLength: 9999,
    },
    departs: {
        type: Date,
        default: function() {
            return new Date().getFullYear();
        }
    }
});

module.exports = {
    getAll,
    getOne,
    create,
    deleteOne,
    update
};

function update(id, updatedFlight) {
    id = parseInt(id);
    const flight = flights.find(flight => flight.id === id);
    Object.assign(flight, updatedFlight);
}

function deleteOne(id) {
    id = parseInt(id);
    const idx = flights.findIndex(flight => flight.id === id);
    flights.splice(idx, 1);
}

function create(flight) {
    flights.push(flight);
}

function getOne(id) {
    id = parseInt(id);
    return flights.find(flight => flight.id === id);
}

function getAll() {
    return flights;
}

module.exports = mongoose.model('Flight', flightSchema)