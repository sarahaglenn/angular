const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String },
  url: { type: String, required: true },
  description: { type: String },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }]
})

model.exports = mongoose.model('Document', documentSchema);
