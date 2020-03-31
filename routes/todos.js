const {Router} = require('express');
const TodosController = require('../controllers/todos');
const todosRouter = Router();

todosRouter.get('/', TodosController.list);
todosRouter.get('/:id', TodosController.getById);
todosRouter.post('/', TodosController.add);
todosRouter.put('/:id', TodosController.edit);
todosRouter.delete('/:id', TodosController.delete);

module.exports = todosRouter;