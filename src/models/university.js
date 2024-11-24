const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const UniversityModel =  mongoose.model('University', universitySchema);

module.exports = UniversityModel;