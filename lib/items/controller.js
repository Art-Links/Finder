var models = require("../../models")
const transformers = require('../transformers')
const { Op } = require("sequelize")



var store = async function (req, res, next) {
    var response = {
        success: true,
        messages: [],
        data: {}
    }
    var name = req?.body?.name
    const userId = req?.user?.id
    var blurImage = req?.body?.blurImage
    var latX = req?.body?.latX
    var lutY = req?.body?.lutY
    var city = req?.body?.city
    var state = req?.body?.state
    var street = req?.body?.street
    var discrrtion = req?.body?.discrrtion
    var categoryId = req.body.categoryId

    if (name.length < 3) {
        response.success = false
        response.messages.push('Name is not a valid')
    }

    if (latX.length < 3) {
        response.success = false
        response.messages.push('latX is not true')
    }

    if (lutY.length < 3) {
        response.success = false
        response.messages.push('lutY is not true')
    }

    if (city.length < 3) {
        response.success = false
        response.messages.push('city is not true')
    }

    if (state.length < 2) {
        response.success = false
        response.messages.push('state is not true')
    }

    if (street.length < 3) {
        response.success = false
        response.messages.push('street is not true')
    }

    if (discrrtion.length < 3) {
        response.success = false
        response.messages.push('discrrtion is not true')
    }

    if (!response.success) {
        res.send(response)
        return
    }

    var blurImage = req?.file?.filename


    const [item, isCreated] = await models.items.findOrCreate({
        where: {
            [Op.and]: [{ name }, { userId }]
        },
        defaults: {
            name,
            latX,
            lutY,
            city,
            state,
            street,
            discrrtion,
            // itemPhotos,
            userId,
            blurImage,
            categoryId
        },

    })
    if (isCreated) {
        response.data = item
        response.messages.push('done')
    } else {
        response.success = false
        response.messages.push('you have added the item befor !')
    }
    return res.send(response)
}

var show = async function (req, res, next) {
    var result = {
        success: true,
        data: {},
        messages: []
    }
    var id = req?.user?.id
    var items = await models.items.findAll({
        where: {
            userId: id
        },
        include: [
            {
                model: models.User,
            },
            {
                model: models.Category
            }]
    })
    if (items) {
        result.data =transformers.itemsTransformer(items)
    } else {
        res.status(404)
        result.messages.push('You do not have a token')
    }
    res.send(result)
}

var index = async function (req, res, nex) {
    var result = {
        success: true,
        data: {},
        messages: []
    }
    var AllItems = await models.items.findAll({
        include: [
            {
                model: models.User
            },
            {
                model: models.Category
            }
        ]
    })
    if (AllItems?.length > 0) {
        result.data = transformers.itemsTransformer(AllItems)
    } else {
        res.status(404)
        res.success = false
        result.messages.push('Please Try again later')
    }
    res.send(result)
}

var showdes = async function (req, res, nex) {
    var result = {
        success: true,
        data: {},
        messages: []
    }
    var id = req?.params?.id
    var des = await models.items.findOne({
        where: {
             id
        },
        include: [
            // {
            //     model: models.User
            // },
            {
                model: models.Category
            }
        ]
    })
    if (des) {
        result.data = des
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
    var deleted = await models.items.destroy({
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
    var blurImage = req?.body?.blurImage
    var latX = req?.body?.latX
    var lutY = req?.body?.lutY
    var city = req?.body?.city
    var state = req?.body?.state
    var street = req?.body?.street
    var discrrtion = req?.body?.discrrtion

    if (name.length < 3) {
        response.success = false
        response.messages.push('Name is not a valid')
    }

    // if (blurImage.length < 5) {
    //     response.success = false
    //     response.messages.push('blurImage is not a valid')
    // }

    if (latX.length < 3) {
        response.success = false
        response.messages.push('latX is not true')
    }

    if (lutY.length < 3) {
        response.success = false
        response.messages.push('lutY is not true')
    }

    if (city.length < 3) {
        response.success = false
        response.messages.push('city is not true')
    }

    if (state.length < 3) {
        response.success = false
        response.messages.push('state is not true')
    }

    if (street.length < 3) {
        response.success = false
        response.messages.push('street is not true')
    }

    if (discrrtion.length < 3) {
        response.success = false
        response.messages.push('discrrtion is not true')
    }
    if (!response.success) {
        res.send(response)
        return
    }
    var blurImage = req?.file?.filename
    var id = req.params.id
    var updateUser = await models.items.update({
        name: name,
        blurImage: blurImage,
        latX: latX,
        lutY: lutY,
        city: city,
        state: state,
        street: street,
        discrrtion: discrrtion,
    }, {
        where: {
            id: id
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
    showdes
}