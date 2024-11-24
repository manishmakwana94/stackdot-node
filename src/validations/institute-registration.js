const { check, validationResult, body } = require('express-validator');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const validateAddInstituteRegistration = [
  check('institute')
    .notEmpty()
    .withMessage('Institute is required'),

  body().custom((reqBody) => {
    const { institute, medium, standards, subjects, class: classField, board, degree, university, exam } = reqBody;

    if (institute === 'playhouse') {
      if (!medium) throw new Error('Medium is required for Playhouse');
      if (!standards) throw new Error('Standards are required for Playhouse');
      if (!subjects) throw new Error('Subjects are required for Playhouse');
      if (classField !== 'Pre-primary') throw new Error('Class must be "Pre-primary" for Playhouse');
    }

    if (institute === 'school') {
      if (!medium) throw new Error('Medium is required for School');
      if (!standards) throw new Error('Standards are required for School');
      if (!subjects) throw new Error('Subjects are required for School');
      if (!board) throw new Error('Board is required for School');
      if (!['Primary', 'Secondary', 'Higher Secondary'].includes(classField))
        throw new Error('Class must be one of "Primary", "Secondary", or "Higher Secondary" for School');
    }

    if (institute === 'college') {
      if (!medium) throw new Error('Medium is required for College');
      if (!subjects) throw new Error('Subjects are required for College');
      if (!board) throw new Error('Board is required for College');
      if (!degree) throw new Error('Degree is required for College');
      if (!university) throw new Error('University is required for College');
      if (!exam) throw new Error('Exam is required for College');
    }

    if (institute === 'competitive-exam') {
      if (!exam) throw new Error('Exam is required for Competitive Exam Center');
      if (!board) throw new Error('Board is required for Competitive Exam Center');
      if (!degree) throw new Error('Degree is required for Competitive Exam Center');
    }

    // All validations passed
    return true;
  }),

  // Validate optional MongoDB ObjectId fields for consistency
  check('board').optional().isMongoId().withMessage('Invalid board ID'),
  check('medium').optional().isMongoId().withMessage('Invalid medium ID'),
  check('class').optional(),
  check('standards').optional().isArray().withMessage('Standards should be an array'),
  check('subjects').optional().isArray().withMessage('Subjects should be an array of Object IDs'),
  check('university').optional().isMongoId().withMessage('Invalid university ID'),
  check('degree').optional().isMongoId().withMessage('Invalid degree ID'),
  check('exam').optional().isMongoId().withMessage('Invalid exam ID'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array()?.map(err => ({
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

module.exports = validateAddInstituteRegistration;
