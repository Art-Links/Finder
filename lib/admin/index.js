var express = require('express');
var router = express.Router();
const controller = require('./contoller');
const isAuthenticated = require('../../middlewares/isAuthenticated')
// const isAuthorized = require('../../middlewares/isAuthorized')
const isAdmin = require('../../middlewares/isAdmin')




router.post('/',  controller.store)
router.get('/:id', isAuthenticated, isAdmin, controller.show)
router.get('/',  controller.index)
router.delete('/:id', isAuthenticated, isAdmin, controller.destroy)
router.put('/:id', isAuthenticated, isAdmin, controller.update)
router.post('/login', controller.login)

module.exports = router;