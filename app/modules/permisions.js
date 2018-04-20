const checkPermission = (name, req, res, next) => {
    if (req.logedUser.permissions.includes(name)) return next();

    res.status(403).send({
        message: 'not allowed'
    });

}

module.exports = checkPermission;