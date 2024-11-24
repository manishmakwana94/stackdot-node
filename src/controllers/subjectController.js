const mongoose = require('mongoose');
const SubjectModel = require('../models/subject');
const ObjectId = mongoose.Types.ObjectId;

// Get all subject data
const getSubjectData = async (req, res) => {
  try {
    const getAllSubjects = await SubjectModel.find()
      .populate({
        path: 'standard', // Ensure the correct field name is used for population
        select: 'name', // Select the fields you want from the referenced collection
      });
    res.status(200).json(getAllSubjects);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve subject data', error: error.message });
  }
};

// Add a new subject
const addSubjectData = async (req, res) => {
  try {
    const { name, standard } = req.body;
    
    const newSubject = new SubjectModel({ name, standard: new ObjectId(standard) });
    await newSubject.save();
    
    const data = { message: 'Subject data added successfully' };
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSubjectData, addSubjectData };
