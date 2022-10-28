var express = require('express');
var router = express.Router();
const controller = require('./controller');
const isAuthenticated = require('../../middlewares/isAuthenticated')
const isAuthorized = require('../../middlewares/isAuthorized')




router.post('/', controller.store)
router.get('/:id', controller.show)
router.get('/', controller.index)
router.delete('/:id', isAuthenticated, isAuthorized, controller.destroy)
router.put('/:id', isAuthenticated, isAuthorized, controller.update)
router.post('/login', controller.login)

module.exports = router;