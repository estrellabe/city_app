var express = require("express");
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken"); // Añadido para el manejo de JWT
mongoose.set('strictQuery', false);
var router = express.Router();
var debug = require("debug")("cityplus:server");
var db = mongoose.connection;

// Modelo de datos
var Usuario = require("../models/Usuario");

// Middleware para verificar si el usuario está autenticado
const verificarToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ error: 'No se proporcionó un token' });
  }
    jwt.verify(token.split(' ')[1], process.env.TOKEN_SECRETO, (error, decoded) => {
      if (error) {
        return res.status(401).json({ error: 'Token inválido' });
      }
      req.user = decoded; 
      next();
    });
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
  res.status(200).send("User " + req.body.name + " has successfully added");
});

/* PUT user by email */
router.put("/:email", function (req, res, next) {
  var updated_user = req.body;
  res.status(200).send("User with email " + req.body.email + " successfully updated");
});

/* DELETE user by email */
router.delete("/:email", function (req, res, next) {
  res.status(200).send("User with email" + req.params.email + " successfully removed");
});

module.exports = router;