const {Todo} = require('../models');

class TodosController {
    static list(req, res, next) {
        Todo.findAll().then(todos => {
            res.status(200).json(todos);
        }).catch(next);
    }
}

module.exports = TodosController;