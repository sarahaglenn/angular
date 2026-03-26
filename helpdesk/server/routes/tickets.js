const express = require('express');
const router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Ticket = require('../models/ticket');

router.get('/', (req, res) => {

  Ticket.find()
  .then(tickets => {
  res.status(200).json({
    ticket: 'Tickets fetched successfully!',
    tickets: tickets
  });
})
.catch(err => {
    res.status(500).json({
      ticket: 'An error occurred while retrieving tickets.',
      error: err
    });
  });
});

router.post('/', (req, res, next) => {
  const maxTicketId = sequenceGenerator.nextId("tickets");

  const ticket = new Ticket({
    id: maxTicketId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: '107'
  });

  ticket.save()
    .then(createdTicket => {
      res.status(201).json({
        ticket: 'Ticket added successfully',
        newTicket: createdTicket
      });
    })
    .catch(error => {
       res.status(500).json({
          ticket: 'An error occurred',
          error: error
        });
    });
});

module.exports = router;
