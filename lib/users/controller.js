const models = require('../../models')
var authService = require('../../services/authService')
const { Op } = require("sequelize")


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
        console.log(req?.body)
        if (userName.length < 3) {
            response.success = false
            response.messages.push('Name is not a valid')
            return res.send(response)
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

        const [user, isCreated] = await models.User.findOrCreate({
            where: {
                [Op.or]: [{ userName }, { email }]
            },
            defaults: {
                userName,
                email,
                password: authService.hashPassword(password)
            }
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
    var user = await models.User.findByPk(id)
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
    var AllUsers = await models.User.findAll({})
    if (AllUsers?.length > 0) {
        result.data = AllUsers
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
        success: true,
        messages: [],
        data: {}
    }
    var userName = req?.body?.userName
    var email = req?.body?.email
    var password = req?.body?.password
    if (userName.length < 3) {
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
    var updateUser = await models.User.update({
        userName: userName,
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
        var account = req.body.account.trim()
        var password = req.body.password.trim()
        var user = await models.User.findOne({
            where: {
                [Op.and]: [
                    {[Op.or]: [{ email: account }, { userName: account }]}, 
                     {deleteAt: {[Op.eq]: null}}  
                    ]
            },

        })
    
        if (user) {
            if(authService.comparePassword(password, user.password)) {
                const token = authService.generateToken(user)
                if(token) {
                    result.success = true
                    result.token = token
                    result.messages.push('you are in')
                    return res.status(200).send(result)
                }else {
                    
                    result.success = false
                    result.messages.push('please try again')
                    return res.status(200).send(result)
                }
            }
        }
            result.success = false
            result.messages.push('Wrong email or password')
            return res.status(201).send(result) 
    } catch(err){
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