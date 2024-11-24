const mongoose = require('mongoose');

const EducationBoardSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., CBSE, GSAB
  instituteType: { type: mongoose.Schema.Types.ObjectId, ref: 'InstituteType', required: true } // Reference to InstituteType
});

const EducationBoardModel =  mongoose.model('EducationBoard', EducationBoardSchema);

module.exports = EducationBoardModel;