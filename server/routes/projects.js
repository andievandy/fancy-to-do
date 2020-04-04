const { Router } = require('express');
const authentication = require('../middlewares/authentication');
const checkUserExists = require('../middlewares/checkuserexists');
const errorHandler = require('../middlewares/errorhandler');
const validationHandler = require('../middlewares/validationhandler');
const { projectOwnerHandler, projectHandler } = require('../middlewares/projecthandler');
const ProjectsController = require('../controllers/projects');
const projectsRouter = Router();

projectsRouter.use(authentication, checkUserExists);
projectsRouter.get('/', ProjectsController.list);
projectsRouter.post('/', ProjectsController.add);
projectsRouter.put('/:id', projectOwnerHandler, ProjectsController.edit);
projectsRouter.delete('/:id', projectOwnerHandler, ProjectsController.delete);
projectsRouter.use(validationHandler);
projectsRouter.use(errorHandler);

module.exports = projectsRouter;