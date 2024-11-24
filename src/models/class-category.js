const mongoose = require('mongoose');

const ClassCategorySchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., Pre-primary, Secondary
  instituteType: { type: mongoose.Schema.Types.ObjectId, ref: 'InstituteType', required: true }, // Reference to InstituteType
});

const ClassCategoryModel = mongoose.model('ClassCategory', ClassCategorySchema);

module.exports = ClassCategoryModel;