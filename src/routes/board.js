    const express = require('express');
    const { getBoardData, AddBoardData } = require('../controllers/boardController');
    const validateAddBoard = require('../validations/board');

    const BoardRouter = express.Router();
   
    BoardRouter.get('/get-board',  (req, res) => getBoardData(req, res));
    BoardRouter.post('/add-board', validateAddBoard , (req, res) => AddBoardData(req, res));



    module.exports = BoardRouter;