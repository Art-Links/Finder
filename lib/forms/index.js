var express = require('express');
var router = express.Router();
const controller = require('./controller')
const isAuthenticated = require('../../middlewares/isAuthenticated')
const isAuthorized = require('../../middlewares/isAuthorized')
const isUser = require('../../middlewares/isUser')
const isAdmin = require('../../middlewares/isAdmin');
const isOwner = require('../../middlewares/isOwner');





router.post('/', isAuthenticated, isUser, controller.store)
router.get('/:id', isAuthenticated, isOwner, controller.show)
router.get('/', isAuthenticated, isAdmin, controller.index)
router.delete('/:id', isAuthenticated, isAdmin, controller.destroy)
router.put('/accept/:id', isAuthenticated, isOwner, controller.accept)

module.exports = router;