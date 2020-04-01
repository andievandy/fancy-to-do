function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({errors: 'Internal server error.'});
}

module.exports = errorHandler;