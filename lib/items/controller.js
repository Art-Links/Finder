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
    var lat = req?.body?.lat
    var lng = req?.body?.lng
    var description = req?.body?.description
    var placeId = req?.body?.placeId
    var categoryId = req?.body?.categoryId
    var questions = req?.body?.questions
    console.log(req.body, req?.file)
    if (name?.length < 3) {
        response.success = false
        response.messages.push('Name is not a valid')
    }

    if (lat?.length < 3) {
        response.success = false
        response.messages.push('lat is not true')
    }

    if (lng?.length < 3) {
        response.success = false
        response.messages.push('lng is not true')
    }

    if (description?.length < 10) {
        response.success = false
        response.messages.push('description is not true')
    }

    if (!response.success) {
        res.send(response)
        return
    }
    var blurImage = req?.file?.filename

    const item = await models.Item.create({
        name,
        lat,
        lng,
        description,
        userId,
        blurImage,
        categoryId,
        placeId
    })
    if (item) {
        for (var i = 0; i < questions.length; i++) {
            await item.createQuestion({
                question: questions[i]
            })
        }
        response.data = transformers.OneItemTransformer(item)
        response.messages.push('The Item Has been Added')
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
    var items = await models.Item.findAll({
        where: {
            userId: id
        },
        include: [
            {
                model: models.User
            },
            {
                model: models.Question
            },
            {
                model: models.Category
            }
        ]
    })
    if (items) {
        result.data = transformers.AllItemsTransformer(items)
    } else {
        res.status(404)
        result.messages.push('You do not have a token')
    }
    res.send(result)
}

var Item = async function (req, res, next) {
    var result = {
        success: true,
        data: {},
        messages: []
    }
    var id = req.params.id
    var items = await models.Item.findOne({
        // attributes: {
        //     exclude: ["createdAt", "updatedAt"]
        // },
        where: {
            id
        },
        include: [{
            model: models.Question
        }]
    })
    if (items) {
        result.data = transformers.itemTransformer(items)
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
    var AllItems = await models.Item.findAll({
        where:{
            isReturned: { [Op.eq]: null }
        },
        include: [
            {
                model: models.User
            },
            {
                model: models.Category
            },
            // {
            //     model: models.Question
            // },

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

var destroy = async function (req, res, nex) {
    var result = {
        success: true,
        data: {},
        messages: []
    }
    var id = req.params.id
    var deleted = await models.Item.destroy({
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
    const userId = req?.user?.id
    var lat = req?.body?.lat
    var lng = req?.body?.lng
    var description = req?.body?.description
    var placeId = req?.body?.placeId
    var categoryId = req?.body?.categoryId
    var questions = req?.body?.questions
    console.log(req.body)

    if (name?.length < 3) {
        response.success = false
        response.messages.push('Name is not a valid')
    }

    // if (blurImage.length < 5) {
    //     response.success = false
    //     response.messages.push('blurImage is not a valid')
    // }

    if (lat?.length < 3) {
        response.success = false
        response.messages.push('lat is not true')
    }

    if (lng?.length < 3) {
        response.success = false
        response.messages.push('lng is not true')
    }

    if (description?.length < 3) {
        response.success = false
        response.messages.push('description is not true')
    }
    if (!response.success) {
        res.send(response)
        return
    }
    var blurImage = req?.file?.filename
    var id = req.params.id
    var updateUser = await models.Item.update({
        name,
        lat,
        lng,
        description,
        userId,
        blurImage,
        categoryId,
        placeId,
        questions

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
    Item
}