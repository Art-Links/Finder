

var models = require("../../models")


var store = async function (req, res, next) {
    var response = {
        succeess: true,
        massages: [],
        data: {}
    }
    var type = req?.body?.type
    if (type.length < 3) {
        response.succeess = false
        response.massages.push('type is not a valid')
    }
    if (!response.succeess) {
        res.send(response)
        return
    }
    var newUser = await models.UserType.create({
        type: type,
    })
    response.data = newUser
    response.massages.push('done')
    res.send(response)
}

var show = async function (req, res, next) {
    var result = {
        success: true,
        data: {},
        messages: []
    }
    var id = req.params.id
    var user = await models.UserType.findByPk(id)
    if (user) {
        result.data = user
    } else {
        res.status(404)
        result.messages.push('Please Provide a valid ID')
    }
    res.send(result)
}

var index = async function (req, res, nex) {
    var result = {
        success: true,
        data: {},
        messages: []
    }
    var AllUsers = await await models.UserType.findAll()
    if (Array.isArray(AllUsers)) {
        result.data =AllUsers
    } else {
        res.status(404)
        res.success = false
        result.messages.push('Please Try again later')
    }
    res.send(result)
}

var destroy = async function (req, res, nex) {
    var result = {
        success: true,
        data: {},
        messages: []
    }
    var id = req.params.id
    var deleted = await models.UserType.destroy({
        where: {
            id: id
        }
    });
    if (deleted) {
    } else {
        res.status(404)
        result.messages.push('Please try again')
    }
    res.send(result)
}
var update = async function (req, res, next) {
    var response = {
        succeess: true,
        massages: [],
        data: {}
    }
    var type = req?.body?.type

    if (type.length < 3) {
        response.succeess = false
        response.massages.push('Name is not a valid')
    }

    if (!response.succeess) {
        res.send(response)
        return
    }
    var id = req.params.id
    var updateUser = await models.UserType.update({
        type: type,

    }, {
        where: {
            id
        }
    })
    response.data = updateUser
    response.massages.push('done')
    res.send(response)
}
module.exports = {
    store,
    index,
    show,
    destroy,
    update
}