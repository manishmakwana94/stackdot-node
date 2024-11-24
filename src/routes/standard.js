const express = require('express');
const { getStandardData, addStandardData } = require('../controllers/standardController');
const validateAddStandard = require('../validations/standard');

const StandardRouter = express.Router();

// Route to get all standard data
StandardRouter.get('/get-standard', (req, res) => getStandardData(req, res));

// Route to add a new standard
StandardRouter.post('/add-standard', validateAddStandard, (req, res) => addStandardData(req, res));

module.exports = StandardRouter;
