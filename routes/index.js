const {Router} = require('express');
const errorHandler = require('../middlewares/errorhandler');
const validationHandler = require('../middlewares/validationhandler');
const todosRouter = require('./todos');
const mainRouter = Router();

mainRouter.use('/todos', todosRouter);
todosRouter.use(validationHandler);
todosRouter.use(errorHandler);

module.exports = mainRouter;