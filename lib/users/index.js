var express = require('express');
var router = express.Router();
const controller = require('./controller');
const isAuthenticated = require('../../middlewares/isAuthenticated')
const isAuthorized = require('../../middlewares/isAuthorized')
const isAdmin = require('../../middlewares/isAdmin')




router.post('/', controller.store)
router.get('/', isAuthenticated, controller.show)
router.get('/all', controller.index)
router.delete('/:id', isAuthenticated, isAuthorized, isAdmin, controller.destroy)
router.put('/:id', isAuthenticated ,isAdmin, controller.update)
router.put('/', isAuthenticated , controller.updateuser)
router.post('/login', controller.login)

module.exports = router;