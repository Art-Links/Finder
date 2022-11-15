const models = require('../models')
var isOwner = async function(req, res, next) {
    const formId = req.params.id
    const form = await models.Form.findByPk(formId, {
        include: [
            models.Item
        ]
    })

    if (req.user.type == 'user' && req.user.id == form.Item.userId) {
        return next()
    }
    res.status(403)
    res.send({
        success: false,
        messages: ['Youd do not have permission']
    })
}

module.exports = isOwner