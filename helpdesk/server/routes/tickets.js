const express = require('express');
const router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Ticket = require('../models/ticket');
const ticket = require('../models/ticket');

router.get('/', (req, res) => {

  Ticket.find()
  .populate('device assignedTechnician')
  .then(tickets => {
  res.status(200).json({
    tickets: tickets
  });
})
.catch(err => {
    res.status(500).json({
      message: 'An error occurred while retrieving tickets.',
      error: err
    });
  });
});

router.post('/', (req, res, next) => {
  const maxTicketId = sequenceGenerator.nextId("tickets");

  const ticket = new Ticket({
    id: maxTicketId,
    title: req.body.title,
    device: req.body.device,
    issueDescription: req.body.issueDescription,
    status: req.body.status,
    priority: req.body.priority,
    reportedBy: req.body.reportedBy || 'Sarah Glenn',
    createdAt: req.body.createdAt
  });

  ticket.save()
    .then(createdTicket => {
      return createdTicket.populate('device assignedTechnician');
    })
    .then(populatedTicket => {
      res.status(201).json({
        message: 'Ticket added successfully',
        newTicket: populatedTicket
      });
    })
    .catch(error => {
       res.status(500).json({
          message: 'An error occurred',
          error: error
        });
    });
});


router.put('/:id', (req, res, next) => {
  Ticket.findOne({ id: req.params.id })
    .then(ticket => {
      if (!ticket) {
        const error = new Error('Ticket not found');
        error.status = 404;
        throw error;
      }

      ticket.title = req.body.title;
      ticket.device = req.body.device;
      ticket.issueDescription = req.body.issueDescription;
      ticket.assignedTechnician = req.body.assignedTechnician;
      ticket.status = req.body.status;
      ticket.priority = req.body.priority;
      ticket.reportedBy = req.body.reportedBy;

      return ticket.save();
    })
    .then(savedTicket => {
      return savedTicket.populate('device assignedTechnician');
    })
    .then(populatedTicket => {
      res.status(200).json({
        message: 'Ticket updated successfully',
        ticket: populatedTicket
      });
    })
    .catch(error => {
      res.status(error.status || 500).json({
        message: error.message || 'An error occurred',
        error: error
      });
    });
});


router.delete("/:id", (req, res, next) => {
  Ticket.findOne({ id: req.params.id })
    .then(ticket => {
      Ticket.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Ticket deleted successfully"
          });
        })
        .catch(error => {
           res.status(500).json({
           message: 'An error occurred',
           error: error
         });
        })
    })
    .catch(error => {
      res.status(500).json({
        message: 'Ticket not found.',
        error: { ticket: 'Ticket not found'}
      });
    });
});

module.exports = router;

