const mongoose = require('mongoose');

const uploadedFileSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    type: { type: String, required: true }
  },
  { _id: false }
);

const intakeSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, index: true },
  tierName: String,
  amount: Number,
  companyName: String,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  templateChoice: { type: String, default: null },
  uploadedFiles: [uploadedFileSchema],
  assetLink: String,
  details: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Intake', intakeSchema);
