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
        var name = req?.body?.name
        var icon = req?.body?.icon
        if (name.length < 3) {
            response.succeess = false
            response.messages.push('Name is not a valid')
            return res.send(response)
        }

        var icon = req?.file?.filename

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
            response.data = transformer.CategoryTransformers(user)
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
    var category = await models.Category.findOne({
        where: {
            id
        },
        // include:[{
        //     model: models.UserType
        // }]
    })
    if (category) {
        result.data = transformer.CategoryTransformers(category)
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

    var id = req?.user?.id
    var category = await models.Category.findAll({
        attributes: {
            exclude: ["createdAt", "updatedAt", "id"]
        },
    })
    if (category) {
        result.data = transformer.CategoriesTransformer(category)
        result.messages.push('the category')
    } else {
        res.status(404)
        res.success = false
        result.messages.push('You do not have a token')
    }
    res.send(result)
}

var Index = async function (req, res, nex) {
    var result = {
        success: true,
        data: {},
        messages: []
    }

    var id = req?.params?.id
    var category = await models.Item.findAll({
        where: {
            categoryId: id
        }
    })
    if (category) {
        result.data = category
    } else {
        res.status(404)
        res.success = false
        result.messages.push('You do not have a token')
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
        result.success = true
        result.messages.push('Category has been deleted')
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
    // if (icon.length < 3) {
    //     response.succeess = false
    //     response.messages.push('icon is not a valid')
    // }

    if (!response.succeess) {
        res.send(response)
        return
    }

    var icon = req?.file?.filename
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



module.exports = {
    store,
    index,
    show,
    destroy,
    update,
    Index
}