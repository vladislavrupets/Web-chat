module.exports = function catchErrors (fx){
    return function (req, res, next) {
        fx(req, res, next).catch((err) => {
            if (typeof err === 'string') {
                res.status(400).json({
                    message: err,
                });
            }
            else {
                next(err);
            }
        });
    }
}