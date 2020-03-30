const {Router} = require('express');
const todosRouter = require('./todos');
const mainRouter = Router();

mainRouter.use('/todos', todosRouter);

module.exports = mainRouter;