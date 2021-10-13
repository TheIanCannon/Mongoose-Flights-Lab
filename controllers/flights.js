const Flight = require("../models/flight");
const Ticket = require("../models/ticket");

module.exports = {
    index,
    new: newFlight,
    create,
    show,
    delete: deleteFlight,
    edit,
    update,
};

function getDefaultDate() {
    let dt = new Flight().departs;
    let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
    departsDate += `-${dt.getDate().toString().padStart(2, "0")}T${dt
    .toTimeString()
    .slice(0, 5)}`;
    return departsDate;
}

function index(req, res) {
    Flight.find({}, function(err, flights) {
        res.render("flights/index", { flights, title: "Flights" });
    });
}

function newFlight(req, res) {
    res.render("flights/new", {
        title: "New Flight",
        destDate: getDefaultDate(),
    });
}

function create(req, res) {
    let flight = new Flight(req.body);
    flight.save(function(err) {
        res.redirect(`/flights/${flight._id}`);
    });
}

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        Ticket.find({ flight: flight._id }, function(err, tickets) {
            res.render("flights/show", {
                flight,
                tickets,
                title: "Details",
                destDate: getDefaultDate(),
            });
        });
    });
}

function deleteFlight(req, res) {
    Flight.findByIdAndDelete(req.params.id, function(err) {
        res.redirect("/flights");
    });
}

function edit(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        if (err) {
            res.redirect(`/flights/${req.params.id}`);
        }
        res.render("flights/edit", {
            flight,
            title: "Edit Flight",
            flightDeparts: flight.departs.toISOString().slice(0, 16),
        });
    });
}

function update(req, res) {
    Flight.findByIdAndUpdate(req.params.id, req.body, function(err, flight) {
        if (err) {
            res.render("flights/edit", { flight, title: "Edit Flight" });
        }
        res.redirect(`flights/${flight._id}`);
    });
}