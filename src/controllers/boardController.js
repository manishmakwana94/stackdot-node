const mongoose = require('mongoose');
const EducationBoardModel = require("../models/education-board");
const ObjectId = mongoose.Types.ObjectId;

const getBoardData = async (req, res) => {
    try {
      const getAllBoards = await EducationBoardModel.find()
        .populate({
          path: 'instituteType',
          select: 'name',
        });
      res.status(200).json(getAllBoards);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve board data', error: error.message });
    }
  };

  

const AddBoardData = async (req, res) => {
    try {
        const { name, instituteType } = req.body;
        
        const newBoard = new EducationBoardModel({ name, instituteType: new ObjectId(instituteType) });
        await newBoard.save();
        
        const data = { message: "Board data added successfully" };
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getBoardData, AddBoardData }