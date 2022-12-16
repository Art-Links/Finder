const models = require('../../models')
// var authService = require('../../services/authService')
const { Op } = require("sequelize")
const transformer = require('../transformers')




var store = async function (req, res, next) {
    try {

        var response = {
            succeess: true,
            messages: [],
            data: {}
        }
        var avatar = req?.body?.avatar
        var bgPic = req?.body?.bgPic
        var phone = req?.body?.phone
        var city = req?.body?.city
        var state = req?.body?.state
        var street = req?.body?.street
        // const userId = req?.user?.id


        // if (avatar.length < 3) {
        //     response.succeess = false
        //     response.messages.push('avatar is not a valid')
        //     return res.send(response)
        // }
        // if (bgPic.length < 3) {
        //     response.succeess = false
        //     response.messages.push('bgPic is not a valid')
        //     return res.send(response)
        // }
        if (phone.length < 3) {
            response.succeess = false
            response.messages.push('phone is not a valid')
            return res.send(response)
        }
        if (city.length < 3) {
            response.succeess = false
            response.messages.push('city is not a valid')
            return res.send(response)
        }
        if (state.length < 3) {
            response.succeess = false
            response.messages.push('state is not a valid')
            return res.send(response)
        }
        if (street.length < 3) {
            response.succeess = false
            response.messages.push('street is not a valid')
            return res.send(response)
        }

        const bgPicPhoto = req?.files?.bgPic[0]?.filename
        const avatarPhoto = req.files?.avatar[0]?.filename
        console.log("request", req.files.bgPic[0].filename)
        console.log("avatar", req.files.avatar[0].filename)
        // console.log("avatar....................",req?.files)
        // const [user, isCreated] = await models.UserInfo.create({
        const user = await models.UserInfo.create({
            // where: {
            //     [Op.or]: [{ avatar }, { bgPic }]
            // },
            // defaults: {
            avatar: avatarPhoto,
            bgPic: bgPicPhoto,
            phone,
            city,
            state,
            street,
            // }
        })

        if (user) {
            response.succeess = true
            response.data = user
            response.messages.push("The UserInformation has been created")
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
    var userInfo = await models.UserInfo.findOne({
        where: {
            id
        },
        // include:[{
        //     model: models.UserType
        // }]
    })
    if (userInfo) {
        result.data = transformer.UserInfoTransformer(userInfo)
    } else {
        res.status(404)
        result.messages.push('Please Provide a valid ID')
    }
    res.send(result)
}

var index = async function (req, res, nex) {
    try {
        var result = {
            success: true,
            data: {},
            messages: []
        }

        var id = req?.user?.id
        var userInfo = await models.UserInfo.findOne({
            where: {
                id
            }
        })
        if (userInfo) {
            result.data = transformer.UserInfosTransformer(userInfo)
        } else {
            res.status(404)
            res.success = false
            result.messages.push('You do not have a token')
        }
        res.send(result)
    } catch (err) {
        console.log("ERROR-> ", err)
        response.messages.push('server error')
        return res.status(500).send(result)
    }
}


var destroy = async function (req, res, nex) {
    var result = {
        success: true,
        data: {},
        messages: []
    }
    var id = req.params.id
    var deleted = await models.UserInfo.destroy({
        where: {
            id: id
        }
    });
    if (deleted) {
        result.success = true
        result.messages.push('userInfo has been deleted')
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
    var avatar = req?.body?.avatar
    var bgPic = req?.body?.bgPic
    var phone = req?.body?.phone
    var city = req?.body?.city
    var state = req?.body?.state
    var street = req?.body?.street
    const userId = req?.user?.id

    // if (avatar.length < 3) {
    //     response.succeess = false
    //     response.messages.push('avatar is not a valid')
    //     return res.send(response)
    // }
    // if (bgPic.length < 3) {
    //     response.succeess = false
    //     response.messages.push('bgPic is not a valid')
    //     return res.send(response)
    // }
    if (phone.length < 3) {
        response.succeess = false
        response.messages.push('phone is not a valid')
        return res.send(response)
    }
    if (city.length < 3) {
        response.succeess = false
        response.messages.push('city is not a valid')
        return res.send(response)
    }
    if (state.length < 3) {
        response.succeess = false
        response.messages.push('state is not a valid')
        return res.send(response)
    }
    if (street.length < 3) {
        response.succeess = false
        response.messages.push('street is not a valid')
        return res.send(response)
    }

    if (!response.succeess) {
        res.send(response)
        return
    }

    var avatar = req?.file?.filename
    var bgPic = req?.file?.filename
    var id = req.params.id
    var updateUser = await models.UserInfo.update({
        avatar,
        bgPic,
        phone,
        city,
        state,
        street,
        userId
    }, {
        where: {
            id
        }
    })
    response.data = updateUser
    response.messages.push('done')
    res.send(response)
}




module.exports = {
    store,
    index,
    show,
    destroy,
    update,
}