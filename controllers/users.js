const { User } = require('../models');
const jwt = require('jsonwebtoken');

class UsersController {
    static register(req, res, next) {
        let field = req.body;
        User.create({
            email: field.email,
            password: field.password
        }).then(user => {
            res.status(201).json({
                id: user.id,
                email: user.email,
                password: field.password
            })
        }).catch(next);
    }

    static login(req, res, next) {

    }
}

module.exports = UsersController;