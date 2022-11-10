var express = require('express');
var router = express.Router();
const controller = require('./controller');
const isAuthenticated = require('../../middlewares/isAuthenticated')
const isAuthorized = require('../../middlewares/isAuthorized')
const isAdmin = require('../../middlewares/isAdmin')




router.post('/', controller.store)
router.get('/', isAuthenticated, controller.show)
router.get('/all', isAuthenticated, isAdmin, controller.index)
router.delete('/:id', isAuthenticated, isAuthorized, isAdmin, controller.destroy)
router.put('/', isAuthenticated, controller.update)
router.post('/login', controller.login)
router.post('/signout', controller.signOut)


module.exports = router;