const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
  maxDocumentId: { type: Int32, required: true },
  maxMessageId: { type: Int32, required: true },
  maxContactId: { type: Int32, required: true },
})

model.exports = mongoose.model('Sequence', sequenceSchema);
