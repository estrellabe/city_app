var express = require("express");
var mongoose = require("mongoose");
mongoose.set('strictQuery', false);
var router = express.Router();
var debug = require("debug")("cityplus:server");
var db = mongoose.connection;

// Modelo de datos
var Usuario = require("../models/Usuario");

var users = {
  users: [
    {
      id: 123,
      name: "Jane Doe",
      phones: {
        home: "800-123-4567",
        mobile: "877-123-1234",
      },
      email: ["jd@example.com", "jd@example.org"],
      dateOfBirth: "1980-01-02T00:00:00.000Z",
      registered: true,
    },
    {
      id: 456,
      name: "Peter Nolan",
      phones: {
        home: "800-123-3498",
        mobile: "877-432-1278",
      },
      email: ["pt@example.com", "pt@example.org"],
      dateOfBirth: "1983-01-09T00:00:00.000Z",
      registered: false,
    },
  ],
};

// Middleware para verificar si el usuario esta autenticado
const verificarTolen = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ error: 'No se proporcionó un token' });
  } else {
    jwt.verify(token, process.env.TOKEN_SECRETO, (error, decoded) => {
      if (error) {
        return res.status(401).json({ error: 'Token inválido' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
  next();
}

/* GET users listing. */
router.get("/", verificarTolen, async (req, res) => {
  try {
    const { googleID } = req.user;
    const usuario = await Usuario.findOne({ googleID });
    if (!usuario){
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
