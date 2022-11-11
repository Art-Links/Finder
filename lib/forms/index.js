var express = require('express');
var router = express.Router();
const controller = require('./controller')
const isAuthenticated = require('../../middlewares/isAuthenticated')
const isAuthorized = require('../../middlewares/isAuthorized')
const isAdmin = require('../../middlewares/isAdmin')





router.post('/', isAuthenticated, isAuthorized, controller.store)
router.get('/:id', isAuthenticated, isAuthorized, controller.show)
router.get('/', isAuthenticated, isAuthorized, controller.index)
router.delete('/:id', isAuthenticated, isAuthorized, controller.destroy)
router.put('/:id', isAuthenticated, isAuthorized, controller.update)

module.exports = router;