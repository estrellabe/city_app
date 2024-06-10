var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');
dotenv.config();
var passport = require('passport');
require('../config/passport');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email']}));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
        // Autenticación con éxito, redireccionar a la página de inicio
        const token = jwt.sign(req.user, process.env.TOKEN_SECRETO, {expiresIn: 60 * 60 * 24});
        res.redirect('/dashboard?token=${token}');
    }
);


module.exports = router;
