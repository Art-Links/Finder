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


router.post('/', isAuthenticated, isAuthorized, upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'bgPic', maxCount: 1 }]), controller.store)
router.get('/:id', isAuthenticated, isAuthorized, controller.show)
router.get('/', isAuthenticated, isAuthorized, controller.index)
router.delete('/:id', isAuthenticated, isAuthorized, controller.destroy)
router.put('/:id', isAuthenticated, isAuthorized, upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'bgPic', maxCount: 1 }]), controller.update)

module.exports = router;