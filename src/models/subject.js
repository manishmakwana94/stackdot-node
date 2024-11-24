const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  standard: { type: mongoose.Schema.Types.ObjectId, ref: 'Standard', required: true }
});

const SubjectModel = mongoose.model('Subject', subjectSchema);
module.exports = SubjectModel;
