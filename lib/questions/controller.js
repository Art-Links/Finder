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
        var question = req?.body?.question
        var itemId = req?.body?.itemId

        if (question.length < 3) {
            response.succeess = false
            response.messages.push('question is not a valid')
            return res.send(response)
        }


        const [user, isCreated] = await models.Question.findOrCreate({
            where: {
                [Op.or]: [{ question }]
            },
            defaults: {
                question,
                itemId
            }
        })

        if (isCreated) {
            response.succeess = true
            response.data = user
            response.messages.push("The Question has been created")
            return res.status(200).send(response)
        }
        response.succeess = false
        response.messages.push("you are already add this Question !!")
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
    var question = await models.Question.findOne({
        where: {
            id
        },
        // include:[{
        //     model: models.UserType
        // }]
    })
    if (question) {
        result.data = transformer.QuestionTransformer(question)
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

    var question = await models.Question.findAll({})
    if (question) {
        result.data = transformer.QuestionsTransformer(question)
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
    var deleted = await models.Question.destroy({
        where: {
            id: id
        }
    });
    if (deleted) {
        result.success = true
        result.messages.push('Question has been deleted')
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

    var question = req?.body?.question

    if (question.length < 3) {
        response.succeess = false
        response.messages.push('question is not a valid')
    }

    if (!response.succeess) {
        res.send(response)
        return
    }

    var id = req.params.id
    var updatequestion = await models.Question.update({
        question
    }, {
        where: {
            id
        }
    })
    response.data = updatequestion
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