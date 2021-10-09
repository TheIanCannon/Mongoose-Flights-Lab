const Flight = require('../models/flight');

module.exports = {
    index,
    create,
    new: newFlight,
};


function index(req, res) {
    Flight.find({}, function(err, flights) {
        res.render('flights/index', { flights });
    });
}

function create(req, res) {
    Flight.create(req.body);
    res.redirect('/flights');
}

/*
function create(req, res) {
    const flight = new Flight(req.body);
    flight.save(function(err) {
        // one approach to handling errors
        if (err) return res.render('flights/new');
        console.log(flight);
        // We have updated/created/deleted data
        // therefore we redirect, not render
        res.redirect('/flights');
    });
} */

function newFlight(req, res) {
    res.render('flights/new');
}