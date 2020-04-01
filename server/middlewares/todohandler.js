const { Todo } = require('../models');

function todoHandler(req, res, next) {
    let id = req.params.id;
    Todo.findByPk(id).then(todo => {
        if(todo) {
            if(todo.UserId === req.userId) {
                req.todo = todo;
                next();
            } else {
                res.status(403).json({errors: 'You are not authorized to access this item'});
            }
        } else {
            res.status(404).json({errors: 'Todo not found'});
        }
    }).catch(next);
}

module.exports = todoHandler;