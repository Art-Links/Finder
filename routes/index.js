var express = require('express');
var router = express.Router();

router.use('/users',require("../lib/users"))
router.use('/type',require("../lib/userTypes"))
router.use('/category',require("../lib/categories"))
router.use('/items',require("../lib/items"))
router.use('/admin',require("../lib/admin"))
router.use('/userInfo',require("../lib/userInfo"))
router.use('/questions',require("../lib/questions"))
router.use('/forms',require("../lib/forms"))

module.exports = router;
