var express = require('express');
var router = express.Router();
const controller = require('./controller')
const isAuthenticated = require('../../middlewares/isAuthenticated')
const isAuthorized = require('../../middlewares/isAuthorized')
const isAdmin = require('../../middlewares/isAdmin')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        var ext = file.originalname.split('.')
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext[ext.length - 1])
    }
})
const upload = multer({ storage: storage })


router.post('/', isAuthenticated, isAuthorized, isAdmin, upload.single('icon'), controller.store)
router.get('/:id', isAuthenticated, isAuthorized, isAdmin, controller.show)
router.get('/', isAuthenticated, isAuthorized, isAdmin, controller.index)
router.get('/items/:id', isAuthenticated, isAuthorized, controller.Index)
router.delete('/:id', isAuthenticated, isAuthorized, isAdmin, controller.destroy)
router.put('/:id', isAuthenticated, isAuthorized, isAdmin, upload.single('icon'), controller.update)

module.exports = router;