const express = require('express');
const { getClassCategoryData, addClassCategoryData } = require('../controllers/classCategoryController');
const validateAddClassCategory = require('../validations/class-category');

const ClassCategoryRouter = express.Router();

// Route to get all class category data
ClassCategoryRouter.get('/get-class-category', (req, res) => getClassCategoryData(req, res));

// Route to add a new class category
ClassCategoryRouter.post('/add-class-category', validateAddClassCategory, (req, res) => addClassCategoryData(req, res));

module.exports = ClassCategoryRouter;
