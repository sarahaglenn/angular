const mongoose = require('mongoose');

const technicianSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  imageUrl: { type: String},
})

module.exports = mongoose.model('Technician', technicianSchema);
