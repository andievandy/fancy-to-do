const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const crypto = require('crypto');
const { User } = require('../models');
const googleClientId = '1041442023481-9n1nlnl4jdl63obaekubtdiuvdkd1r0q.apps.googleusercontent.com';
const oAuthClient = new OAuth2Client(googleClientId);
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

    static loginWithGoogle(req, res, next) {
        let idToken = req.body.idToken;
        let oAuthData = null;
        oAuthClient.verifyIdToken({
            idToken,
            audience: googleClientId
        }).then(data => {
            oAuthData = data.getPayload();
            return User.findOne({
                where: {
                    email: oAuthData.email
                }
            });
        }).then(user => {
            if(user) {
                return user;
            } else {
                let password = crypto.randomBytes(256).toString('hex');
                return User.create({
                    email: oAuthData.email,
                    password
                });
            }
        }).then(user => {
            let token = jwt.sign({
                userId: user.id,
                userEmail: user.email
            }, process.env.JWT_SECRETKEY);
            res.status(201).json({accessToken: token});
        }).catch(next);
    }
}

module.exports = UsersController;