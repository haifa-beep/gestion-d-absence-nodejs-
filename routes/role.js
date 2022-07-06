var express = require('express');
var router = express.Router();
var role = require("../module/role");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;