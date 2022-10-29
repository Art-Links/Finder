const models = require('../../models')
var authService = require('../../services/authService')
const { Op } = require("sequelize")

function isValidEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}


var store = async function (req, res, next) {
    try {

        var response = {
            success: true,
            messages: [],
            data: {}
        }
        const name = req?.body?.name
        const email = req?.body?.email
        const password = req?.body?.password
        // const userTypeId = req?.body?.userTypeId
        if (name.length < 3) {
            response.success = false
            response.messages.push('Name is not a valid')
            return res.send(response)
        }
        if (!isValidEmail(email)) {
            return res.send('email is wrong !')
        }

        if (email.length < 5) {
            response.success = false
            response.messages.push('email is not a valid')
            return res.send(response)
        }
        if (password.length < 7) {
            response.success = false
            response.messages.push('password is not true')
            return res.send(response)
        }

        const [user, isCreated] = await models.admin.findOrCreate({
            where: {
                [Op.or]: [{ name }, { email }]
            },
            defaults: {
                name,
                email,
                password: authService.hashPassword(password),
                // userTypeId: type
            },
            // include: [
            //     models.UserType
            // ]
        })

        if (isCreated) {
            response.success = true
            response.data = user
            response.messages.push("The acount has been created")
            return res.status(200).send(response)
        }
        response.success = false
        response.messages.push("you are already have account please login")
        return res.status(300).send(response)

    } catch (err) {
        console.log("ERROR-> ", err)
        response.messages.push('server error')
        return res.status(500).send(response)
    }
}

var show = async function (req, res, next) {
    var result = {
        success: true,
        data: {},
        messages: []
    }
    var id = req.params.id
    var user = await models.admin.findOne({
        where: {
            id
        },
        include:[{
            model: models.UserType
        }]
    })
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
    var AllUsers = await models.admin.findAll({})
    if (AllUsers?.length > 0) {
        result.data = AllUsers
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
    var deleted = await models.admin.destroy({
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
        success: true,
        messages: [],
        data: {}
    }
    var name = req?.body?.name
    var email = req?.body?.email
    var password = req?.body?.password
    if (name.length < 3) {
        response.success = false
        response.messages.push('Name is not a valid')
    }
    if (email.length < 5) {
        response.success = false
        response.messages.push('email is not a valid')
    }
    if (password.length < 7) {
        response.success = false
        response.messages.push('password is not true')
    }
    if (!response.success) {
        res.send(response)
        return
    }
    var id = req.params.id
    var updateUser = await models.admin.update({
        name: name,
        email: email,
        password: password
    }, {
        where: {
            id
        }
    })
    response.data = updateUser
    response.messages.push('done')
    res.send(response)
}

var login = async function (req, res, next) {
    try {
        var result = {
            success: true,
            messages: [],
            data: {},
            token: null
        }
        var account = req.body.account
        var password = req.body.password
        var admin = await models.admin.findOne({
            where: {
                [Op.and]: [
                    { [Op.or]: [{ email: account }, { name: account }] },
                    // { deleteAt: { [Op.eq]: null } }
                ]
            },
            include:[{
                model: models.UserType
            }]
        })

        if (admin) {
            if (authService.comparePassword(password, admin.password)) {
                const token = authService.generateToken(admin)
                if (token) {
                    result.success = true
                    result.token = token
                    result.messages.push('you are in')
                    return res.status(200).send(result)
                } else {
                    result.success = false
                    result.messages.push('please try again')
                    return res.status(200).send(result)
                }
            }
        }
        result.success = false
        result.messages.push('Wrong email or password')
        return res.status(201).send(result)
    } catch (err) {
        console.log("Error->", err)
        result.success = false
        result.messages.push('server error')
        return res.status(500).send(result)
    }
}



module.exports = {
    store,
    index,
    show,
    destroy,
    update,
    login
}