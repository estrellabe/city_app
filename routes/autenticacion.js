const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const Usuario = require('../models/Usuario');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Verificación del token de Google desde el frontend
router.post('/google', async (req, res) => {
    const { token } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { sub: googleID, name, email } = ticket.getPayload();
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            const token = jwt.sign({ id: usuario._id }, process.env.TOKEN_SECRETO, { expiresIn: 60 * 60 * 24 });
            res.json({ token });
        } else {
            usuario = new Usuario({
                googleID,
                nombre: name,
                email,
            });
            await usuario.save();
            const token = jwt.sign({ id: usuario._id }, process.env.TOKEN_SECRETO, { expiresIn: 60 * 60 * 24 });
            res.json({ token });
        }
    } catch (error) {
        res.status(400).json({ error: 'Error al iniciar sesión' });
    }
});

module.exports = router;