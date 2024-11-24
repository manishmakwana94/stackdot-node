const mongoose = require('mongoose');
const MediumModel = require('../models/medium');
const ObjectId = mongoose.Types.ObjectId;

const getMediumData = async (req, res) => {
  try {
    const getAllMediums = await MediumModel.find()
      .populate({
        path: 'instituteType', // Ensure the correct field name is used for population
        select: 'name', // Select the fields you want from the referenced collection
      });
    res.status(200).json(getAllMediums);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve medium data', error: error.message });
  }
};

// Add a new medium
const addMediumData = async (req, res) => {
  try {
    const { name, instituteType } = req.body;
    
    const newMedium = new MediumModel({ name, instituteType: new ObjectId(instituteType) });
    await newMedium.save();
    
    const data = { message: 'Medium data added successfully' };
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMediumData, addMediumData };
