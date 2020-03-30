const {Router} = require('express');
const errorHandler = require('../middlewares/errorhandler');
const validationHandler = require('../middlewares/validationhandler');
const TodosController = require('../controllers/todos');
const todosRouter = Router();

todosRouter.get('/', TodosController.list);
todosRouter.post('/', TodosController.add);
todosRouter.use(validationHandler);
todosRouter.use(errorHandler);

module.exports = todosRouter;