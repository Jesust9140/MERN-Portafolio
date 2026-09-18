const mongoose = require('mongoose');

const adminSessionSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  createdAt: {
    type: Date,
    default: Date.now,
    // TTL index - Mongo automatically deletes the document 30 days after
    // createdAt, so old sessions expire on their own without extra cleanup.
    expires: 60 * 60 * 24 * 30
  }
});

module.exports = mongoose.model('AdminSession', adminSessionSchema);
