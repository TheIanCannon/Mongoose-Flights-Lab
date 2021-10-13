var express = require('express');
// const { route } = require('.');
var router = express.Router();
const ticketsCtrl = require('../controllers/tickets.js');

// GET tickets info
router.get('/flights/:id/tickets/new', ticketsCtrl.new);
router.post('/flights/:id/tickets', ticketsCtrl.create);
router.delete('/tickets/:id', ticketsCtrl.delete);

module.exports = router;