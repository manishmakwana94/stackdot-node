const mongoose = require('mongoose');

const DegreeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, enum: ['Bachelor', 'Master', 'Doctorate'], required: true }
});

const DegreeModel = mongoose.model('Degree', DegreeSchema);

module.exports = DegreeModel