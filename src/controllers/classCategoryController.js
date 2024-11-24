const mongoose = require('mongoose');
const ClassCategoryModel = require('../models/class-category');
const ObjectId = mongoose.Types.ObjectId;

// Get all class category data
const getClassCategoryData = async (req, res) => {
  try {
    const getAllClassCategories = await ClassCategoryModel.find()
      .populate({
        path: 'instituteType', // Ensure the correct field name is used for population
        select: 'name', // Select the fields you want from the referenced collection
      });
    res.status(200).json(getAllClassCategories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve class category data', error: error.message });
  }
};

// Add a new class category
const addClassCategoryData = async (req, res) => {
  try {
    const { name, instituteType } = req.body;
    
    const newClassCategory = new ClassCategoryModel({ name, instituteType: new ObjectId(instituteType) });
    await newClassCategory.save();
    
    const data = { message: 'Class category data added successfully' };
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getClassCategoryData, addClassCategoryData };
