const express = require('express');
const router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Technician = require('../models/technician');

router.get('/', (req, res) => {

  Technician.find()
  .then(technicians => {
  res.status(200).json({
    message: 'Technicians fetched successfully!',
    technicians: technicians
  });
})
.catch(err => {
    res.status(500).json({
      message: 'An error occurred while retrieving technicians.',
      error: err
    });
  });
});

router.post('/', (req, res, next) => {
  const maxTechnicianId = sequenceGenerator.nextId("technicians");

  const technician = new Technician({
    id: maxTechnicianId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: req.body.group
  });

  technician.save()
    .then(createdTechnician => {
      res.status(201).json({
        message: 'Technician added successfully',
        technician: createdTechnician
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
  Technician.findOne({ id: req.params.id })
    .then(technician => {
      technician.name = req.body.name;
      technician.email = req.body.email;
      technician.phone = req.body.phone;
      technician.imageUrl = req.body.imageUrl;
      technician.group= req.body.group;


      Technician.updateOne({ id: req.params.id }, technician)
        .then(result => {
          res.status(204).json({
            message: 'Technician updated successfully'
          })
        })
        .catch(error => {
           res.status(500).json({
           message: 'An error occurred',
           error: error
         });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Technician not found.',
        error: { technician: 'Technician not found'}
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Technician.findOne({ id: req.params.id })
    .then(technician => {
      Technician.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Technician deleted successfully"
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
        message: 'Technician not found.',
        error: { technician: 'Technician not found'}
      });
    });
});

module.exports = router;
