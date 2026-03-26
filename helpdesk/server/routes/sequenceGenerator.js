let Sequence = require('../models/sequence');

let maxDeviceId;
let maxTicketId;
let maxTechnicianId;
let sequenceId = null;

function SequenceGenerator() {

  Sequence.findOne()
    .exec()
    .then(sequence => {

      sequenceId = sequence._id;
      maxDeviceId = sequence.maxDeviceId;
      maxTicketId = sequence.maxTicketId;
      maxTechnicianId = sequence.maxTechnicianId;
    })
    .catch(err => {
      console.log("Error initializing SequenceGenerator: " + err)
    });
}

SequenceGenerator.prototype.nextId = function(collectionType) {

  let updateObject = {};
  let nextId;

  switch (collectionType) {
    case 'devices':
      maxDeviceId++;
      updateObject = {maxDeviceId: maxDeviceId};
      nextId = maxDeviceId;
      break;
    case 'tickets':
      maxTicketId++;
      updateObject = {maxTicketId: maxTicketId};
      nextId = maxTicketId;
      break;
    case 'technicians':
      maxTechnicianId++;
      updateObject = {maxTechnicianId: maxTechnicianId};
      nextId = maxTechnicianId;
      break;
    default:
      return -1;
  }

  Sequence.updateOne({_id: sequenceId}, {$set: updateObject})
    .catch(err => {
        console.log("nextId error = " + err);
      });

  return nextId;
}

module.exports = new SequenceGenerator();
