const mongoose = require('mongoose');

const InstituteRegistration = new mongoose.Schema({
  instituteType: { type: mongoose.Schema.Types.ObjectId, ref: 'InstituteType', required: true },
  board: { type: mongoose.Schema.Types.ObjectId, ref: 'EducationBoard' },
  medium: { type: mongoose.Schema.Types.ObjectId, ref: 'Medium' },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'ClassCategory' },
  standard: { type: mongoose.Schema.Types.ObjectId, ref: 'Standard' },
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
  university: { type: mongoose.Schema.Types.ObjectId, ref: 'University' },
  degree: { type: mongoose.Schema.Types.ObjectId, ref: 'Degree' },
  exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
  createdAt: { type: Date, default: Date.now }
});

const InstituteRegistrationModel = mongoose.model('InstituteRegistration', InstituteRegistration);
module.exports = InstituteRegistrationModel;