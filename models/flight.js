const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let destinationSchema = new Schema({
    airport: {
        type: String,
        enum: ['SFO', 'OAK', 'LAX', 'SAN', 'DFW']
    },
    arrival: {
        type: Date
    }
}, {
    timestamps: true
})

let flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['American', 'Southwest', 'United'],
    },
    flightNo: {
        type: Number,
        required: true,
        min: 10,
        max: 9999
    },
    departs: {
        type: Date,
        default: function() {
            let oneYearFromNow = new Date();
            return oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
        }
    },
    airport: {
        type: String,
        enum: ['SFO', 'OAK', 'LAX', 'SAN', 'DFW'],
        default: 'SAN'
    },
    destinations: [destinationSchema],
}, {
    timestamps: true
})

module.exports = mongoose.model('Flight', flightSchema);