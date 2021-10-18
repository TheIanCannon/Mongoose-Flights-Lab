const Flight = require("../models/flight");

module.exports = {
    create,
    delete: deleteDest,
};

function create(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        flight.destinations.push(req.body);
        flight.save(function(err) {
            res.redirect(`/flights/${flight._id}`);
        });
    });
}

function deleteDest(req, res) { // find flight, then flight id, then delete it:
    Flight.findOne({ 'destinations._id': req.params.id }, function(err, flight) { //error first, then w/e flight you're seeking
        const destSubdoc = flight.destinations.id(req.params.id); // this .id function is only available for subdocs
        destSubdoc.remove();
        flight.save(function(err) {
            res.redirect(`/flights/${flight._id}`);
        });
    });
}