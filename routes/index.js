var express = require('express');
var router = express.Router();

router.use('/users',require("../lib/users"))
router.use('/type',require("../lib/userTypes"))

module.exports = router;
