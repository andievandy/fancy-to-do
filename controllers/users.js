const { User } = require('../models');
const jwt = require('jsonwebtoken');
const { checkPassword } = require('../helpers/password');

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
        let field = req.body;
        User.findOne({
            where: {
                email: field.email
            }
        }).then(user => {
            if(user) {
                if(checkPassword(field.password, user.password)) {
                    return jwt.sign({
                        userId: user.id,
                        userEmail: user.email
                    }, process.env.JWT_SECRETKEY);
                }
            }
        }).then(token => {
            if(token) {
                res.status(201).json({accessToken: token});
            } else {
                res.status(400).json({errors: 'Invalid Username/Password'});
            }
        }).catch(next);
    }
}

module.exports = UsersController;