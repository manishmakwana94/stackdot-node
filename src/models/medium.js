const mongoose = require('mongoose');

const MediumSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., English, Hindi
  instituteType: { type: mongoose.Schema.Types.ObjectId, ref: 'InstituteType', required: true } // References InstituteType
});

const MediumModel =  mongoose.model('Medium', MediumSchema);
module.exports = MediumModel;