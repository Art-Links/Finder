const models = require('../../models')
var authService = require('../../services/authService')
const { Op } = require("sequelize")
const transformers = require('../transformers')

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
        const userName = req?.body?.userName
        const email = req?.body?.email
        const password = req?.body?.password
        const passwordConfirmation = req?.body?.passwordConfirmation
        const userTypeId = req?.body?.userTypeId
        if (userName?.length < 3) {
            response.success = false
            response.messages.push('Please check your userName')
            return res.send(response)
        }
        if (!isValidEmail(email)) {
            return res.send('email is wrong !')
        }

        if (email?.length < 5) {
            response.success = false
            response.messages.push('Please check your email')
            return res.send(response)
        }
        if (password?.length < 7) {
            response.success = false
            response.messages.push('Please check your password')
            return res.send(response)
        }
        if (passwordConfirmation.length < 7) {
            response.success = false
            response.messages.push('passwordConfirmation is not TRUE')
            return res.send(response)
        }
        if (password != passwordConfirmation) {
            response.success = false
            response.messages.push('passwordConfirmation is not same as password')
            return res.send(response)
        }

        const [user, isCreated] = await models.User.findOrCreate({
            where: {
                [Op.or]: [{ userName }, { email }]
            },
            defaults: {
                userName,
                email,
                password: authService.hashPassword(password),
                passwordConfirmation: authService.hashPassword(passwordConfirmation),
                userTypeId: 1
            },
            // include: [
            //     models.UserType
            // ]
        })

        if (isCreated) {
            response.success = true
            response.data = user
            response.messages.push("Admin has been created successfully")
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
    var admin = await models.User.findOne({
        where: {
            id
        },
        include: [{
            model: models.UserType
        }]
    })
    if (admin) {
        result.data =transformers.AdminTransformers(admin)
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
    var AllAdmins = await models.User.findAll({
        include: [{
            model: models.UserType
        }]
    })
    if (AllAdmins?.length > 0) {
        result.data =transformers.AdminsTransformer(AllAdmins)
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
    var deleted = await models.User.destroy({
        where: {
            id: id
        }
    });
    if (deleted) {
        res.status(200)
        result.messages.push('Admin has been deleted')
    } else {
        res.status(404)
        result.success = false
        result.messages.push('Please provide a valid ID')
    }
    res.send(result)
}
var update = async function (req, res, next) {
    var response = {
        success: true,
        messages: [],
        data: {}
    }
    var useruserName = req?.body?.userName
    var email = req?.body?.email
    var password = req?.body?.password
    if (userName?.length < 3) {
        response.success = false
        response.messages.push('Please check your userName')
    }
    if (email?.length < 5) {
        response.success = false
        response.messages.push('Please check your email')
    }
    if (password?.length < 7) {
        response.success = false
        response.messages.push('Please check your password')
    }
    if (!response.success) {
        res.send(response)
        return
    }
    var id = req.params.id
    var updatedAdmin = await models?.User?.update({
        userName: userName,
        email: email,
        password: password
    }, {
        where: {
            id: id
        }
    })
    response.data = updatedAdmin
    response.messages.push('Admin has been updated successfully')
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
        var loggedAdmin = await models.admin.findOne({
            where: {
                [Op.and]: [
                    { [Op.or]: [{ email: account }, { name: account }] },
                    // { deletedAt: { [Op.eq]: null } }
                ]
            },
            include: [{
                model: models.UserType
            }]
        }).then((user) => {
            if (!user) {
                return false
            } else {
                if (authService.comparePassword(password, user.password)) {
                    return user
                } else {
                    return false
                }
            }
        })
        if (loggedAdmin) {
            result.data = loggedAdmin,
            result.token = authService.generateToken(loggedAdmin.id, 'admin')
            result.messages.push('you are in')
        } else {
            result.success = false
            result.messages.push('Wrong email or password')
        }
        res.send(result)
        // if (admin) {
        //     if (authService.comparePassword(password, admin.password)) {
        //         const token = authService.generateToken(admin)
        //         if (token) {
        //             result.success = true
        //             result.token = token
        //             result.messages.push('you are in')
        //             return res.status(200).send(result)
        //         } else {
        //             result.success = false
        //             result.messages.push('please try again')
        //             return res.status(200).send(result)
        //         }
        //     }
        // }
        // result.success = false
        // result.messages.push('Wrong password or email')
        // return res.status(201).send(result)
    } catch (err) {
        // console.log("Error->", err)
        // result.success = false
        // result.messages.push('server error')
        // return res.status(500).send(result)
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