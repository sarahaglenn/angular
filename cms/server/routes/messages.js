const express = require('express');
const router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');

router.get('/', (req, res) => {

  Message.find()
  .then(messages => {
  res.status(200).json({
    message: 'Messages fetched successfully!',
    messages: messages
  });
})
.catch(err => {
    res.status(500).json({
      message: 'An error occurred while retrieving messages.',
      error: err
    });
  });
});

router.post('/', (req, res, next) => {
  const maxMessageId = sequenceGenerator.nextId("messages");

  const message = new Message({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: '107'
  });
  console.log(message);

  message.save()
    .then(createdMessage => {
      res.status(201).json({
        message: 'Message added successfully',
        newMessage: createdMessage
      });
    })
    .catch(error => {
       res.status(500).json({
          message: 'An error occurred',
          error: error
        });
    });
});

module.exports = router;
