const {ValidationError} = require('sequelize');

function errorHandler(err, req, res, next) {
    if(err instanceof ValidationError) {
        let errMsg = err.errors.map(error =>  error.message);
        res.status(400).json({msg: errMsg});
    } else {
        next(err);
    }
}

module.exports = errorHandler;