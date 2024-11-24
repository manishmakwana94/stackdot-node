const express = require('express');
const { getSubjectData, addSubjectData } = require('../controllers/subjectController');
const validateAddSubject = require('../validations/subject');

const SubjectRouter = express.Router();

// Route to get all subject data
SubjectRouter.get('/get-subject', (req, res) => getSubjectData(req, res));

// Route to add a new subject
SubjectRouter.post('/add-subject', validateAddSubject, (req, res) => addSubjectData(req, res));

module.exports = SubjectRouter;
