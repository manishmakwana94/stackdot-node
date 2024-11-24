const { check, validationResult } = require('express-validator');
const MediumModel = require('../models/medium');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const validateAddMedium = [
  check('name').notEmpty().withMessage('Name is required'),
  check('instituteType').notEmpty().withMessage('Institute type is required'),

  check('name').custom(async (value, { req }) => {
    const { instituteType } = req.body;

    // Check if the same name already exists for the given instituteType
    const medium = await MediumModel.findOne({ name: value, instituteType: new ObjectId(instituteType) });
    if (medium) {
      throw new Error('Medium name already assigned to this Institute Type');
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

module.exports = validateAddMedium;
