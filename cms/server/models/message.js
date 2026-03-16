const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  id: { type: String, required: true },
  subject: { type: String },
  msgText: { type: String, required: true },
  sender: { type: String, required: true }
})

model.exports = mongoose.model('Message', messageSchema);

// sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact'}
// In the dummy data given, the sender has ids like '7', '3', rather than the Object id
