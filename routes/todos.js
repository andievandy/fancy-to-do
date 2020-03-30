const {Router} = require('express');
const errorHandler = require('../middlewares/errorhandler');
const validationHandler = require('../middlewares/validationhandler');
const TodosController = require('../controllers/todos');
const todosRouter = Router();

todosRouter.get('/', TodosController.list);
todosRouter.get('/:id', TodosController.getById);
todosRouter.post('/', TodosController.add);
todosRouter.put('/:id', TodosController.edit);
todosRouter.use(validationHandler);
todosRouter.use(errorHandler);

module.exports = todosRouter;