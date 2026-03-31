const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  device: { type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true },
  assignedTechnician: { type: mongoose.Schema.Types.ObjectId, ref: 'Technician', default: null },
  status: {
    type: String,
    required: true,
    enum: ['Open', 'In-Progress', 'Resolved', 'Closed'],
    default: 'Open'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  reportedBy: { type: String, required: true, default: 'Sarah Glenn' },
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);
