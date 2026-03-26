const express = require('express');
const router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Device = require('../models/device')

router.get('/', (req, res) => {

  Device.find()
  .then(devices => {
  res.status(200).json({
    devices: devices
  });
})
.catch(err => {
    res.status(500).json({
      message: 'An error occurred while retrieving devices.',
      error: err
    });
  });
});

router.post('/', (req, res, next) => {
  const maxDeviceId = sequenceGenerator.nextId("devices");

  const device = new Device({
    id: maxDeviceId,
    name: req.body.name,
    status: req.body.status,
    lastMaintained: req.body.lastMaintained,
  });

  device.save()
    .then(createdDevice => {
      res.status(201).json({
        device: createdDevice
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
  Device.findOne({ id: req.params.id })
    .then(device => {
      device.name = req.body.name;
      device.status = req.body.status;
      device.lastMaintained = req.body.lastMaintained;


      Device.updateOne({ id: req.params.id }, device)
        .then(result => {
          res.status(204).json({
            message: 'Device updated successfully'
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
        message: 'Device not found.',
        error: { device: 'Device not found'}
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Device.findOne({ id: req.params.id })
    .then(device => {
      Device.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Device deleted successfully"
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
        message: 'Device not found.',
        error: { device: 'Device not found'}
      });
    });
});

module.exports = router;
