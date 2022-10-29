var models = require("../../models")


var store = async function (req, res, next) {
    var response = {
        succeess: true,
        massages: [],
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
        response.succeess = false
        response.massages.push('Name is not a valid')
    }

    if (blurImage.length < 5) {
        response.succeess = false
        response.massages.push('blurImage is not a valid')
    }

    if (latX.length < 3) {
        response.succeess = false
        response.massages.push('latX is not true')
    }

    if (lutY.length < 3) {
        response.succeess = false
        response.massages.push('lutY is not true')
    }

    if (city.length < 3) {
        response.succeess = false
        response.massages.push('city is not true')
    }

    if (state.length < 3) {
        response.succeess = false
        response.massages.push('state is not true')
    }

    if (street.length < 3) {
        response.succeess = false
        response.massages.push('street is not true')
    }

    if (discrrtion.length < 3) {
        response.succeess = false
        response.massages.push('discrrtion is not true')
    }

    if (!response.succeess) {
        res.send(response)
        return
    }
    var newUser = await models.items.create({
        name: name,
        blurImage: blurImage,
        latX:latX,
        lutY:lutY,
        city:city,
        state:state,
        street:street,
        discrrtion:discrrtion,
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
    var user = await models.items.findByPk(id)
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
    var AllUsers = await models.items.findAll({})
    if (AllUsers?.length > 0) {
        result.data =AllUsers
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
        succeess: true,
        massages: [],
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
        response.succeess = false
        response.massages.push('Name is not a valid')
    }

    if (blurImage.length < 5) {
        response.succeess = false
        response.massages.push('blurImage is not a valid')
    }

    if (latX.length < 3) {
        response.succeess = false
        response.massages.push('latX is not true')
    }

    if (lutY.length < 3) {
        response.succeess = false
        response.massages.push('lutY is not true')
    }

    if (city.length < 3) {
        response.succeess = false
        response.massages.push('city is not true')
    }

    if (state.length < 3) {
        response.succeess = false
        response.massages.push('state is not true')
    }

    if (street.length < 3) {
        response.succeess = false
        response.massages.push('street is not true')
    }

    if (discrrtion.length < 3) {
        response.succeess = false
        response.massages.push('discrrtion is not true')
    }
    if (!response.succeess) {
        res.send(response)
        return
    }
    var id = req.params.id
    var updateUser = await models.items.update({
        name: name,
        blurImage: blurImage,
        latX:latX,
        lutY:lutY,
        city:city,
        state:state,
        street:street,
        discrrtion:discrrtion,
    }, {
        where: {
            id:id
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
    update,
}