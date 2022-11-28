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
        var answers = req?.body?.answers
        var itemId = req?.body?.itemId
        var userId = req?.user.id

        if (answers.length < 1) {
            response.succeess = false
            response.messages.push('answers is not a valid')
            return res.send(response)
        }

        var finalAnswers = []
        for (var i = 0; i < answers.length; i++) {
            questionId = answers[i].id
            const qModel = await models.Question.findByPk(questionId)
            finalAnswers.push({
                question: qModel.question,
                answer: answers[i].answer
            })
        }

        const form = await models.Form.create({
            answers: JSON.stringify(finalAnswers),
            itemId,
            userId,
            accepted: 0
        })

        if (form) {
            // send notification
            response.succeess = true
            response.data = form
            response.messages.push("The answers has been created")
            return res.status(200).send(response)
        }
        response.succeess = false
        response.messages.push("you are already add this answers !!")
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
    var answers = await models.Form.findOne({
        where: {
            id
        },
        // include:[{
        //     model: models.UserType
        // }]
    })
    if (answers) {
        result.data = answers
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

    var answers = await models.Form.findAll({
        include: [{
            model: models.Item,
            where: {
                deletedAt: { [Op.eq]: null }
            }
        },

        {
            model: models.User,
        }]
    })
    if (answers) {
        result.data = answers
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
        result.messages.push('answers has been deleted')
    } else {
        res.status(404)
        result.messages.push('Please try again')
    }
    res.send(result)
}


// var update = async function (req, res, next) {
//     var response = {
//         succeess: true,
//         messages: [],
//         data: {}
//     }

//     var answers = req?.body?.answers


//         if (answers.length < 3) {
//             response.succeess = false
//             response.messages.push('answers is not a valid')
//             return res.send(response)
//         }

//     if (!response.succeess) {
//         res.send(response)
//         return
//     }

//     var id = req.params.id
//     var updateanswers = await models.Form.update({
//         answers
//     }, {
//         where: {
//             id
//         }
//     })
//     response.data = updateanswers
//     response.messages.push('done')
//     res.send(response)
// }


const accept = async (req, res, next) => {
    var result = {
        success: true,
        data: {},
        messages: []
    }
    form = await models.Form.update({
        accepted: 1
    }, {
        where: {
            id: req.params.id,
            accepted: 0
        }
    })
    if (form[0]) {
        result.messages.push('The form has been accepted')
    } else {
        result.success = false
        result.messages.push('Please try again later')
    }
    return res.send(result)
}


module.exports = {
    store,
    index,
    show,
    destroy,
    // update,
    accept
}