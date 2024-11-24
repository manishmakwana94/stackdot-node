const express = require('express');
const { getInstituteRegistrationData, addInstituteRegistrationData } = require('../controllers/instituteRegistrationController');
const validateAddInstituteRegistration = require('../validations/institute-registration');

const InstituteRegistrationRouter = express.Router();

// Route to get all institute registration data
InstituteRegistrationRouter.get('/get-institute-registration', (req, res) => getInstituteRegistrationData(req, res));

// Route to add a new institute registration
InstituteRegistrationRouter.post('/add-institute-registration', validateAddInstituteRegistration, (req, res) => addInstituteRegistrationData(req, res));

module.exports = InstituteRegistrationRouter;
