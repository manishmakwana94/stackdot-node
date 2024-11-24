const { check, validationResult } = require('express-validator');
const StandardModel = require('../models/standard');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const validateAddStandard = [
  check('name').notEmpty().withMessage('Name is required'),
  check('class').notEmpty().withMessage('Class is required'),

  check('name').custom(async (value, { req }) => {
    const { class: classId } = req.body;

    // Check if the same name already exists for the given class
    const standard = await StandardModel.findOne({ name: value, class: new ObjectId(classId) });
    if (standard) {
      throw new Error('Standard name already assigned to this Class Category');
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

module.exports = validateAddStandard;
