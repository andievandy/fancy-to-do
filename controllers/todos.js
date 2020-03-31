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
            let todosViewable = todos.map((todo) => {
                return todo.getViewablePropertiesToUser();
            })
            res.status(200).json(todosViewable);
        }).catch(next);
    }

    static getById(req, res) {
        res.status(200).json(req.todo.getViewablePropertiesToUser());
    }

    static add(req, res, next) {
        let {title, description, status, due_date} = req.body;
        Todo.create({title, description, status, due_date, UserId: req.userId}).then(todo => {
            res.status(201).json(todo.getViewablePropertiesToUser());
        }).catch(next);
    }

    static edit(req, res, next) {
        let {title, description, status, due_date} = req.body;
        req.todo.update({title, description, status, due_date}).then(editedTodo => {
            res.status(200).json(editedTodo.getViewablePropertiesToUser());
        }).catch(next);
    }

    static delete(req, res, next) {
        req.todo.destroy().then(() => {
            res.status(200).json(req.todo.getViewablePropertiesToUser());
        }).catch(next);
    }
}

module.exports = TodosController;