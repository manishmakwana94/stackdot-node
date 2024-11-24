const express = require('express');
const { getMediumData, addMediumData } = require('../controllers/mediumController');
const validateAddMedium = require('../validations/medium');

const MediumRouter = express.Router();

// Route to get all medium data
MediumRouter.get('/get-medium', (req, res) => getMediumData(req, res));

// Route to add a new medium
MediumRouter.post('/add-medium', validateAddMedium, (req, res) => addMediumData(req, res));

module.exports = MediumRouter;
