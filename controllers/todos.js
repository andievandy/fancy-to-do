const {Todo} = require('../models');

class TodosController {
    static list(req, res, next) {
        Todo.findAll().then(todos => {
            res.status(200).json(todos);
        }).catch(next);
    }

    static getById(req, res, next) {
        let id = req.params.id;
        Todo.findByPk(id).then(todo => {
            if(todo) {
                res.status(200).json(todo);
            } else {
                res.status(404).json({msg: "Todo not found"});
            }
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