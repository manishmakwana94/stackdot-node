const mongoose = require('mongoose');
const StandardModel = require('../models/standard');
const ObjectId = mongoose.Types.ObjectId;

// Get all standard data
const getStandardData = async (req, res) => {
  try {
    const getAllStandards = await StandardModel.find()
      .populate({
        path: 'class', // Ensure the correct field name is used for population
        select: 'name', // Select the fields you want from the referenced collection
      });
    res.status(200).json(getAllStandards);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve standard data', error: error.message });
  }
};

// Add a new standard
const addStandardData = async (req, res) => {
  try {
    const { name, class: classId } = req.body;
    
    const newStandard = new StandardModel({ name, class: new ObjectId(classId) });
    await newStandard.save();
    
    const data = { message: 'Standard data added successfully' };
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getStandardData, addStandardData };
