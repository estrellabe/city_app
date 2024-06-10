var express = require("express");
var mongoose = require("mongoose");
mongoose.set('strictQuery', false);
var router = express.Router();
var debug = require("debug")("cityplus:server");
var db = mongoose.connection;

// Modelo de datos
var Usuario = require("../models/Usuario");

// Middleware para verificar si el usuario esta autenticado
const verificarTolen = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ error: 'No se proporcionó un token' });
  }
    jwt.verify(token.split(' ')[1], process.env.TOKEN_SECRETO, (error, decoded) => {
      if (error) {
        return res.status(401).json({ error: 'Token inválido' });
      }
      req.decoded = decoded;
      next();
    });
};


// GET del usuario autenticado
router.get("/me", verificarTolen, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.user.id);
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
  var new_user = req.body; // para tener acceso al json de la request
  //ToDo with the new user
  res.status(200).send("User " + req.body.name + " has successfully added");
});

/* PUT user by Id */
router.put("/:id", function (req, res, next) {
  var updated_user = req.body;
  //ToDo user id (update)
  res.status(200).send("User " + req.body.name + " successfully updated");
});

/* DELETE user by Id */
router.delete("/:id", function (req, res, next) {
  //ToDo user id
  res.status(200).send("User with id" + req.params.id + " successfully removed");
});

module.exports = router;
