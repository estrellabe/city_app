var express = require("express");
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken"); // Añadido para el manejo de JWT
mongoose.set('strictQuery', false);
var router = express.Router();
var debug = require("debug")("cityplus:server");
var db = mongoose.connection;
var { OAuth2Client } = require("google-auth-library");

// Modelo de datos
var Usuario = require("../models/Usuario");

// Configuración de Google OAuth2
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

// Middleware para verificar si el usuario está autenticado
const verificarToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ error: 'No se proporcionó un token' });
  }
  try{
    const ticket = await client.verifyIdToken({
      idToken: token.split(' ')[1],
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token no válido' });
  }
};

// GET del usuario autenticado
router.get("/me", verificarToken, async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ email: req.user.email });
    if (!usuario) {
      return res.status(404).send('Usuario no encontrado');
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).send('Error en el servidor');
  }
});

/* POST a new user */
router.post("/", function (req, res, next) {
  var new_user = req.body; 
  res.status(200).send("Usuario " + req.body.email + " añadido correctamente");
});

/* PUT user by email */
router.put("/:email", function (req, res, next) {
  var updated_user = req.body;
  res.status(200).send("El usuario " + req.body.email + " ha sido actualizado");
});

/* DELETE user by email */
router.delete("/:email", function (req, res, next) {
  res.status(200).send("El usuario " + req.params.email + " ha sido eliminado");
});

module.exports = router;