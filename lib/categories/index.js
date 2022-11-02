var express = require('express');
var router = express.Router();
const controller = require('./controller')
const isAuthenticated = require('../../middlewares/isAuthenticated')
const isAuthorized = require('../../middlewares/isAuthorized')
const isAdmin = require('../../middlewares/isAdmin')


router.post('/', isAuthenticated, isAuthorized, isAdmin, controller.store)
router.get('/:id', isAuthenticated, isAuthorized, isAdmin, controller.show)
router.get('/', isAuthenticated, isAuthorized, isAdmin, controller.index)
router.delete('/:id', isAuthenticated, isAuthorized, isAdmin, controller.destroy)
router.put('/:id', isAuthenticated, isAuthorized, isAdmin, controller.update)

module.exports = router;