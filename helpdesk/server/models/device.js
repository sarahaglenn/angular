const mongoose = require('mongoose');

const deviceSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ['Available', 'In Use', 'Under Maintenance', 'Broken', 'Retired'],
    default: 'Available'
  },
  lastMaintained: { type: Date}
})

module.exports = mongoose.model('Device', deviceSchema);
