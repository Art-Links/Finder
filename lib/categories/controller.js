const models = require('../../models')
// var authService = require('../../services/authService')
const { Op } = require("sequelize")




var store = async function (req, res, next) {
    try {

        var response = {
            succeess: true,
            messages: [],
            data: {}
        }
        const name = req?.body?.name
        const icon = req?.body?.icon
        if (name.length < 3) {
            response.succeess = false
            response.messages.push('Name is not a valid')
            return res.send(response)
        }


        if (icon.length < 3) {
            response.succeess = false
            response.messages.push('icon is not a valid')
            return res.send(response)
        }


        const [user, isCreated] = await models.Category.findOrCreate({
            where: {
                [Op.or]: [{ name }, { icon }]
            },
            defaults: {
                name,
                icon,
            }
        })

        if (isCreated) {
            response.succeess = true
            response.data = user
            response.messages.push("The category has been created")
            return res.status(200).send(response)
        }
        response.succeess = false
        response.messages.push("you are already have category please login")
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
    var user = await models.Category.findOne({
        where: {
            id
        },
        // include:[{
        //     model: models.UserType
        // }]
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
    var AllUsers = await models.Category.findAll({})
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
    var deleted = await models.Category.destroy({
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
        messages: [],
        data: {}
    }
    var name = req?.body?.name
    var icon = req?.body?.icon
    if (name.length < 3) {
        response.succeess = false
        response.messages.push('Name is not a valid')
    }
    if (icon.length < 3) {
        response.succeess = false
        response.messages.push('icon is not a valid')
    }

    if (!response.succeess) {
        res.send(response)
        return
    }
    var id = req.params.id
    var updateUser = await models.Category.update({
        name: name,
        icon: icon,
    }, {
        where: {
            id
        }
    })
    response.data = updateUser
    response.messages.push('done')
    res.send(response)
}

// var login = async function (req, res, next) {
//     try {
//         var result = {
//             success: true,
//             messages: [],
//             data: {},
//             token: null
//         }
//         var account = req.body.account.trim()
//         var password = req.body.password.trim()
//         var user = await models.User.findOne({
//             where: {
//                 [Op.and]: [
//                     { [Op.or]: [{ email: account }, { userName: account }] },
//                     { deleteAt: { [Op.eq]: null } }
//                 ]
//             },
//             include:[{
//                 model: models.UserType
//             }]
//         })

//         if (user) {
//             if (authService.comparePassword(password, user.password)) {
//                 const token = authService.generateToken(user)
//                 if (token) {
//                     result.success = true
//                     result.token = token
//                     result.messages.push('you are in')
//                     return res.status(200).send(result)
//                 } else {

//                     result.success = false
//                     result.messages.push('please try again')
//                     return res.status(200).send(result)
//                 }
//             }
//         }
//         result.success = false
//         result.messages.push('Wrong email or password')
//         return res.status(201).send(result)
//     } catch (err) {
//         console.log("Error->", err)
//         result.success = false
//         result.messages.push('server error')
//         return res.status(500).send(result)
//     }
// }



module.exports = {
    store,
    index,
    show,
    destroy,
    update,
    // login
}