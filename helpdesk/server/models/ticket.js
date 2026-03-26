const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
  id: { type: String, required: true },
  device: { type: String, required: true },
  assignedTechnician: { type: mongoose.Schema.Types.ObjectId, ref: 'Technician' },
  status: {
    type: String,
    required: true,
    enum: ['Submitted', 'In Progress', 'Resolved'],
    default: 'Submitted'
  },
  dateSubmitted: { type: Date}
})

module.exports = mongoose.model('Ticket', ticketSchema);
