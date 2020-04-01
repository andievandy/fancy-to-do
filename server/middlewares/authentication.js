const jwt = require('jsonwebtoken');

function authentication(req, res, next) {
    let accessToken = req.headers.accesstoken;
    try {
        let payload = jwt.verify(accessToken, process.env.JWT_SECRETKEY);
        req.userId = payload.userId;
        req.userEmail = payload.userEmail;
        next();
    } catch(err) {
        if(err instanceof jwt.JsonWebTokenError || err instanceof jwt.NotBeforeError) {
            res.status(401).send({errors: 'Invalid or missing token'});
        } else if(err instanceof jwt.TokenExpiredError) {
            res.status(401).send({errors: 'Token expired'});
        } else {
            next(err);
        }
    }
}

module.exports = authentication;