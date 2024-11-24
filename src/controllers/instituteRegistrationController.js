const mongoose = require('mongoose');
const InstituteRegistrationModel = require('../models/institute-registration');
const ObjectId = mongoose.Types.ObjectId;

// Get all institute registration data
const getInstituteRegistrationData = async (req, res) => {
  try {
    const getAllRegistrations = await InstituteRegistrationModel.find()
      .populate('instituteType board medium class standard subjects university degree exam')
      .exec();
    
    res.status(200).json(getAllRegistrations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve institute registration data', error: error.message });
  }
};

// Add a new institute registration
const addInstituteRegistrationData = async (req, res) => {
  try {
    const {
      institute,
      board,
      medium,
      class: classId,
      standard,
      subjects,
      university,
      degree,
      exam
    } = req.body;

    const newInstituteRegistration = new InstituteRegistrationModel({
      institute,
      board,
      medium,
      class: new ObjectId(classId),
      standard: new ObjectId(standard),
      subjects: subjects.map(subject => new ObjectId(subject)),
      university,
      degree,
      exam
    });

    await newInstituteRegistration.save();
    
    const data = { message: 'Institute registration data added successfully' };
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getInstituteRegistrationData, addInstituteRegistrationData };
