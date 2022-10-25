var models = require("../../models")


var store = async function (req, res, next) {
    var response = {
        succeess: true,
        massages: [],
        data: {}
    }
    var userName = req?.body?.userName
    var email = req?.body?.email
    var password = req?.body?.password
    if (userName.length < 3) {
        response.succeess = false
        response.massages.push('Name is not a valid')
    }
    if (email.length < 5) {
        response.succeess = false
        response.massages.push('email is not a valid')
    }
    if (password.length < 7) {
        response.succeess = false
        response.massages.push('password is not true')
    }
    if (!response.succeess) {
        res.send(response)
        return
    }
    var newUser = await models.User.create({
        userName: userName,
        email: email,
        password:password
    })
    response.data = newUser
    response.massages.push('done')
    res.send(response)
}
var index = async function (req, res, nex) {
    var result = {
        success: true,
        data: {},
        messages: []
    }
    var AllUsers = await await models.User.findAll()
    if (Array.isArray(AllUsers)) {
        result.data =AllUsers
    } else {
        res.status(404)
        res.success = false
        result.success.push('Please Try again later')
    }
    res.send('result')
}
var show = async function (req, res, next) {
    var result = {
        success: true,
        data: {},
        messages: []
    }
    var id = req.params.id
    var user = await models.User.findByPk(id)
    if (user) {
        result.data = user
    } else {
        res.status(404)
        result.success.push('Please Provide a valid ID')
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
    var deleted = await models.User.destroy({
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
    var username = req?.body?.username
    var email = req?.body?.email
    var password = req?.body?.password
    if (username.length < 3) {
        response.succeess = false
        response.massages.push('Name is not a valid')
    }
    if (email.length < 5) {
        response.succeess = false
        response.massages.push('email is not a valid')
    }
    if (password.length < 7) {
        response.succeess = false
        response.massages.push('password is not true')
    }
    if (!response.succeess) {
        res.send(response)
        return
    }
    var id = req.params.id
    var updateUser = await models.User.update({
        username: username,
        email: email,
        password:password
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