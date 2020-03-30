const {Router} = require('express');
const errorHandler = require('../middlewares/errorhandler');
const TodosController = require('../controllers/todos');
const todosRouter = Router();

todosRouter.get('/', TodosController.list);
todosRouter.use(errorHandler);

module.exports = todosRouter;