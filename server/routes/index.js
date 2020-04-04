const { Router } = require('express');
const errorHandler = require('../middlewares/errorhandler');
const validationHandler = require('../middlewares/validationhandler');
const UsersController = require('../controllers/users');
const todosRouter = require('./todos');
const projectsRouter = require('./projects');
const mainRouter = Router();

mainRouter.use('/todos', todosRouter);
mainRouter.use('/projects', projectsRouter);
mainRouter.post('/register', UsersController.register);
mainRouter.post('/login', UsersController.login);
mainRouter.post('/google-sign-in', UsersController.loginWithGoogle);
mainRouter.use(validationHandler);
mainRouter.use(errorHandler);

module.exports = mainRouter;