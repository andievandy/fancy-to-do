const jwt = require('jsonwebtoken');

function authentication(req, res, next) {
    let accessToken = req.headers.accesstoken;
    try {
        let payload = jwt.verify(accessToken, process.env.JWT_SECRETKEY);
        req.userId = payload.userId;
        req.userEmail = payload.userEmail;
        next();
    } catch(err) {
        res.status(401).send({errors: 'Invalid or missing token'});
    }
}

module.exports = authentication;