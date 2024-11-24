const { check, validationResult } = require('express-validator');
const SubjectModel = require('../models/subject');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const validateAddSubject = [
  check('name').notEmpty().withMessage('Name is required'),
  check('standard').notEmpty().withMessage('Standard is required'),

  check('name').custom(async (value, { req }) => {
    const { standard } = req.body;

    // Check if the same subject name already exists for the given standard
    const subject = await SubjectModel.findOne({ name: value, standard: new ObjectId(standard) });
    if (subject) {
      throw new Error('Subject name already assigned to this Standard');
    }
  }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map(err => ({
        msg: err.msg,
      }));

      return res.status(400).json({
        status: 400,
        errors: formattedErrors,
      });
    }
    next();
  },
];

module.exports = validateAddSubject;
