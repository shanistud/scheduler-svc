const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.statusCode = err.statusCode || 500;

    res.send({ error: err.message });
};

Object.assign(module.exports, {
    errorHandler
});