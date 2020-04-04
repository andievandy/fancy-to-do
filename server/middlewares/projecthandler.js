const { Project } = require('../models');

function projectOwnerHandler(req, res, next) {
    let id = req.params.id;
    Project.findByPk(id).then(project => {
        if(project) {
            if(project.creatorUserId === req.userId) {
                req.project = project;
                next();
            } else {
                res.status(403).json({errors: 'You are not authorized to access this item'});
            }
        } else {
            res.status(404).json({errors: 'Project not found'});
        }
    }).catch(next);
}

function projectHandler(req, res, next) {
    let id = req.params.id;
    Project.findByPk(id, {
        include: {
            model: User,
            attributes: ['id', 'email']
        }
    }).then(project => {
        if(project) {
            let isMember = false;
            project.Users.forEach(user => {
                if(user.id === req.userId) {
                    isMember = true;
                }
            })
            if(isMember === true) {
                req.project = project;
                next();
            } else {
                res.status(403).json({errors: 'You are not authorized to access this item'});
            }
        } else {
            res.status(404).json({errors: 'Project not found'});
        }
    }).catch(next);
}

module.exports = { projectOwnerHandler, projectHandler };