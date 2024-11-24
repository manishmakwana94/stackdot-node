const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const ClassCategoryModel = require('../models/class-category');
const ObjectId = mongoose.Types.ObjectId;

const validateAddClassCategory = [
  check('name').notEmpty().withMessage('Name is required'),
  check('instituteType').notEmpty().withMessage('Institute type is required'),

  check('name').custom(async (value, { req }) => {
    const { instituteType } = req.body;

    // Check if the same name already exists for the given instituteType
    const classCategory = await ClassCategoryModel.findOne({ name: value, instituteType: new ObjectId(instituteType) });
    if (classCategory) {
      throw new Error('Class category name already assigned to this Institute Type');
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

module.exports = validateAddClassCategory;
