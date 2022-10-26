var express = require('express');
var router = express.Router();

router.use('/users',require("../lib/users"))
router.use('/type',require("../lib/userTypes"))
router.use('/category',require("../lib/categories"))
router.use('/items',require("../lib/items"))

module.exports = router;
