const { Todo } = require('../models');

class TodosController {
    static list(req, res, next) {
        Todo.findAll({
            order:[
                ['id', 'asc']
            ],
            where: {
                UserId: req.userId
            }
        }).then(todos => {
            res.status(200).json(todos);
        }).catch(next);
    }

    static getById(req, res) {
        res.status(200).json(req.todo);
    }

    static add(req, res, next) {
        let {title, description, status, due_date} = req.body;
        Todo.create({title, description, status, due_date, UserId: req.userId}).then(todo => {
            res.status(201).json(todo);
        }).catch(next);
    }

    static edit(req, res, next) {
        let {title, description, status, due_date} = req.body;
        req.todo.update({title, description, status, due_date}).then(editedTodo => {
            res.status(200).json(editedTodo);
        }).catch(next);
    }

    static delete(req, res, next) {
        req.todo.destroy().then(() => {
            res.status(200).json(req.todo);
        }).catch(next);
    }
}

module.exports = TodosController;