/*Backend */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { titulo: 'City+', mensaje: 'Esta es la página de inicio (index)'});
});

module.exports = router;
