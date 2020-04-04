const { Project, User, Todo, ProjectUser } = require('../models');

class ProjectsController {
    static list(req, res, next) {
        User.findByPk(req.userId, {
            include: [{
                model: Project,
                include: [{
                    model: User,
                    as: 'Creator',
                    attributes: ['id', 'email']
                }],
                through: {
                    attributes: []
                }
            }]
        }).then(data => {
            res.status(200).json(data.Projects);
        }).catch(next);
    }

    static add(req, res, next) {
        let createdProject = null;
        Project.create({
            name: req.body.name,
            creatorUserId: req.userId
        }).then(data => {
            createdProject = data;
            return ProjectUser.create({
                ProjectId: data.id,
                UserId: req.userId
            });
        }).then(data => {
            res.status(201).json(createdProject);
        }).catch(next);
    }

    static edit(req, res, next) {
        req.project.update({
            name: req.body.name,
            creatorUserId: req.userId
        }).then(data => {
            res.status(200).json(data);
        }).catch(next);
    }

    static delete(req, res, next) {
        let deletedProject = req.project;
        req.project.destroy().then(() => {
            res.status(200).json(deletedProject);
        }).catch(next);
    }
}

module.exports = ProjectsController;