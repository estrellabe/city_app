var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');
dotenv.config();
var { OAuth2Client } = require('google-auth-library');
var Usuario = require('../models/Usuario');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Verificacion del token de Google desde el frontend
router.post('/google', async (req, res) => {
    const { token } = req.body;
    try{
        const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
    });
    
    const { googleid, name, email} = ticket.getPayload();
    const usuario = await Usuario.findOne({ email });
    
    if (usuario) {
        const token = jwt.sign({id: usuario._id}, process.env.TOKEN_SECRETO, {expiresIn: 60 * 60 * 24});
        res.json({ token });
    } else {
        usuario = new Usuario({
            googleID : googleid,
            nombre: name,
            email: email,
        });
        await usuario.save();
        const token = jwt.sign({ id: usuario._id }, process.env.TOKEN_SECRETO, { expiresIn: 60 * 60 * 24 });
        res.json({ token });
    }
} catch (error) {
    res.status(400).json({ error: 'Error al iniciar sesión' });
}
});