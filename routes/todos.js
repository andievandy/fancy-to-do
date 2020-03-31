const { Router } = require('express');
const authentication = require('../middlewares/authentication');
const checkUserExists = require('../middlewares/checkuserexists');
const TodosController = require('../controllers/todos');
const todosRouter = Router();

todosRouter.use(authentication, checkUserExists);
todosRouter.get('/', TodosController.list);
todosRouter.get('/:id', TodosController.getById);
todosRouter.post('/', TodosController.add);
todosRouter.put('/:id', TodosController.edit);
todosRouter.delete('/:id', TodosController.delete);

module.exports = todosRouter;