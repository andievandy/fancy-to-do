const { Router } = require('express');
const authentication = require('../middlewares/authentication');
const checkUserExists = require('../middlewares/checkuserexists');
const todoHandler = require('../middlewares/todohandler');
const TodosController = require('../controllers/todos');
const todosRouter = Router();

todosRouter.use(authentication, checkUserExists);
todosRouter.get('/', TodosController.list);
todosRouter.get('/:id', todoHandler, TodosController.getById);
todosRouter.post('/', TodosController.add);
todosRouter.post('/random', TodosController.addRandom);
todosRouter.put('/:id', todoHandler, TodosController.edit);
todosRouter.delete('/:id', todoHandler, TodosController.delete);

module.exports = todosRouter;