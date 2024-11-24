const mongoose = require('mongoose');

const InstituteTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  instituteEnem: { type: String, required: true, unique: true } 
});

const InstituteTypeModel = mongoose.model('InstituteType', InstituteTypeSchema);
 module.exports = InstituteTypeModel;