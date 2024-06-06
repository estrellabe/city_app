/* Backend */
var express = require('express');
var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');

dotenv.config();

const router = express.Router();
/* Función para generar el token de autenticación */
function generateToken(user){
    var u = {
        username: user.username,
        id: user._id
    }
    return token = jwt.sign(u, process.env.TOKEN_SECRETO, {
        expiresIn: 60 * 60 * 24 // expira en 24 hours
    })
}
/* Middleware para validar el token */
router.use('/secure', function(req, res, next){
    var token = req.headers['authorization']
    if(!token){
        res.status(401).send({
            ok: false,
            message: 'Token inválido'
        })
    }
    token = token.replace('Bearer ', '') // Remover Bearer del token, asumimos que viene con ese prefijo
    jwt.verify(token, process.env.TOKEN_SECRETO, function(err, decoded){
        if(err){
            return res.status(401).send({
                ok: false,
                message: 'Token inválido'
            });
        } else {
            req.token = decoded
            next()
        }
    });
});

module.exports = router;
