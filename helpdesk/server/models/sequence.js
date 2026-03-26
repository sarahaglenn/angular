const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
  maxDeviceId: { type: Number, required: true },
  maxTicketId: { type: Number, required: true },
  maxTechnicianId: { type: Number, required: true },
})

module.exports = mongoose.model('Sequence', sequenceSchema);
