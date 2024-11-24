const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const ExamModel = mongoose.model('Exam', ExamSchema);
module.exports = ExamModel;