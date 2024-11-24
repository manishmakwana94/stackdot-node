const express = require('express');
const BoardRouter = require('./board');
const MediumRouter = require('./medium');
const ClassCategoryRouter = require('./class-category');
const StandardRouter = require('./standard');
const SubjectRouter = require('./subject');
const InstituteRegistrationRouter = require('./institute-registration');

const apiRouter = express.Router();

apiRouter.use('/board', BoardRouter);
apiRouter.use('/medium', MediumRouter);
apiRouter.use('/class-catagory', ClassCategoryRouter);
apiRouter.use('/standard', StandardRouter);
apiRouter.use('/subject', SubjectRouter);
apiRouter.use('/institute-registration', InstituteRegistrationRouter);

module.exports = apiRouter;