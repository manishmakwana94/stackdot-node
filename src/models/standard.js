const mongoose = require('mongoose');

const standardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'ClassCategory', required: true }
});

const StandardModel =  mongoose.model('Standard', standardSchema);
module.exports = StandardModel;