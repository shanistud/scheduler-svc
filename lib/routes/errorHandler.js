const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.statusCode = err.statusCode;

    res.send({ message: err.message });
};

Object.assign(module.exports, {
    errorHandler
});