const Ticket = require('../models/ticket');
const Flight = require('../models/flight');
module.exports = {
    create,
    new: newTicket,
    delete: deleteTicket,
};

function create(req, res) {
    const ticket = new Ticket(req.body);
    ticket.flight = req.params.id;
    ticket.save(function(err) {
        res.redirect(`/flights/${req.params.id}`);
    });
}

function newTicket(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        res.render('tickets/new', { flight });
    });
}

function deleteTicket(req, res) { // find flight, then flight id, then delete it:
    Ticket.findByIdAndDelete(req.params.id,
        function(err, ticket) { //error first, then w/e flight you're seeking
            res.redirect(`/flights/${ticket.flight}`);
        });
}