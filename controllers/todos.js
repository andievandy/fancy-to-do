const {Todo} = require('../models');

class TodosController {
    static list(req, res, next) {
        Todo.findAll().then(todos => {
            res.status(200).json(todos);
        }).catch(next);
    }

    static add(req, res, next) {
        let {title, description, status, due_date} = req.body;
        Todo.create({title, description, status, due_date}).then(todo => {
            res.status(201).json(todo);
        }).catch(next);
    }
}

module.exports = TodosController;