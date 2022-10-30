var isAuthorized = function(req, res, next) {
    if (req.user.type == 'admin' || (req.user.type == 'user')) {
        return next()
    }
    res.status(403)
    res.send({
        success: false,
        messages: ['Youd do not have permission']
    })
}

module.exports = isAuthorized