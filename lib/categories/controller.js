

var models = require("../../models")


var store = async function (req, res, next) {
    var response = {
        succeess: true,
        massages: [],
        data: {}
    }
    var name = req?.body?.name
    var icon = req?.body?.icon
    if (name.length < 3) {
        response.succeess = false
        response.massages.push('name is not a valid')
    }
    if (icon.length < 3) {
        response.succeess = false
        response.massages.push('icon is not a valid')
    }
    if (!response.succeess) {
        res.send(response)
        return
    }
    var newUser = await models.Category.create({
        name: name,
        icon: icon
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
    var user = await models.Category.findByPk(id)
    if (user) {
        result.data = user
    } else {
        res.status(404)
        result.success.push('Please Provide a valid ID')
    }
    res.send(result)
}

var index = async function (req, res, nex) {
    var result = {
        success: true,
        data: {},
        messages: []
    }
    var AllUsers = await await models.Category.findAll()
    if (Array.isArray(AllUsers)) {
        result.data =AllUsers
    } else {
        res.status(404)
        res.success = false
        result.success.push('Please Try again later')
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
    var deleted = await models.Category.destroy({
        where: {
            id: id
        }
    });
    if (deleted) {
    } else {
        res.status(404)
        result.success.push('Please try again')
    }
    res.send(result)
}
var update = async function (req, res, next) {
    var response = {
        succeess: true,
        massages: [],
        data: {}
    }
    var name = req?.body?.name
    var icon = req?.body?.icon

    if (name.length < 3) {
        response.succeess = false
        response.massages.push('Name is not a valid')
    }

    if (icon.length < 3) {
        response.succeess = false
        response.massages.push('icon is not a valid')
    }

    if (!response.succeess) {
        res.send(response)
        return
    }
    var id = req.params.id
    var updateUser = await models.Category.update({
        name: name,
        icon: icon
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