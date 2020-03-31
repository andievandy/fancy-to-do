const { Todo } = require('../models');

class TodosController {
    static list(req, res, next) {
        Todo.findAll({order:[['id', 'asc']]}).then(todos => {
            res.status(200).json(todos);
        }).catch(next);
    }

    static getById(req, res, next) {
        let id = req.params.id;
        Todo.findByPk(id).then(todo => {
            if(todo) {
                res.status(200).json(todo);
            } else {
                res.status(404).json({message: "Todo not found"});
            }
        }).catch(next);
    }

    static add(req, res, next) {
        let {title, description, status, due_date} = req.body;
        Todo.create({title, description, status, due_date}).then(todo => {
            res.status(201).json(todo);
        }).catch(next);
    }

    static edit(req, res, next) {
        let id = req.params.id;
        let {title, description, status, due_date} = req.body;
        Todo.findByPk(id).then(todo => {
            if(todo) {
                return todo.update({title, description, status, due_date});
            }
        }).then(editedTodo => {
            if(editedTodo) {
                res.status(200).json(editedTodo);
            } else {
                res.status(404).json({message: "Todo not found"});
            }
        }).catch(next);
    }

    static delete(req, res, next) {
        let id = req.params.id;
        let foundTodo = null;
        Todo.findByPk(id).then(todo => {
            if(todo) {
                foundTodo = todo;
                return todo.destroy();
            }
        }).then(() => {
            if(foundTodo) {
                res.status(200).json(foundTodo);
            } else {
                res.status(404).json({message: "Todo not found"});
            }
        }).catch(next);
    }
}

module.exports = TodosController;