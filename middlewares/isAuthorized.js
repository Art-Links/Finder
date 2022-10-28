var isAuthorized = function(req, res, next) {
    console.log(req.user)
    if (req.user.type == 'user' || (req.user.type == 'admin')) {
        return next()
    }
    res.status(403)
    res.send({
        success: false,
        messages: ['You do not have permission to perform this action']
    })
}

module.exports = isAuthorized