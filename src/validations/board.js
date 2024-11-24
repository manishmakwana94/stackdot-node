const { check, validationResult } = require('express-validator');
const EducationBoardModel = require('../models/education-board');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const validateAddBoard = [
  check('name').notEmpty().withMessage('Name is required'),
  check('instituteType').notEmpty().withMessage('Institute type is required'),

  check('name').custom(async (value, { req }) => {
    const { instituteType } = req.body;

    const board = await EducationBoardModel.findOne({ name: value, instituteType: new ObjectId(instituteType) });
    if (board) {
      throw new Error('Board name already assign this Institute Type');
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

module.exports = validateAddBoard;
