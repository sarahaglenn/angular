const express = require('express');
const router = express.Router();

const ticketRoutes = require('./tickets');
const technicianRoutes = require('./technicians');
const deviceRoutes = require('./devices');

router.use('/tickets', ticketRoutes)
router.use('/technicians', technicianRoutes)
router.use('/devices', deviceRoutes)

module.exports = router;
