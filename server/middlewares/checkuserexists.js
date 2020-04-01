const { User } = require('../models');

function checkUserExists(req, res, next) {
    User.findByPk(req.userId).then(user => {
        if(user) {
            next();
        } else {
            res.status(401).json({errors: 'User not registered'});
        }
    }).catch(next);
}

module.exports = checkUserExists;