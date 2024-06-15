// Propósito: Definir las rutas y operaciones CRUD para el modelo Bicicleta
var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var debug = require("debug")("cityplus:server");
var db = mongoose.connection;

//Model de datos
var Bicicleta = require("../models/Bicicleta");

// Conexión a la base de datos
db.on("error", console.error.bind(console, "Error de conexión con la BD: "));
db.once("open", function () {
  debug("BD conectada correctamente");
});

// Crear una nueva bicicleta - POST
router.post('/', async (req, res) => {
  try {
    const bicicleta = new Bicicleta(req.body);
    await bicicleta.save();
    res.status(201).json(bicicleta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todas las bicicletas - GET
router.get('/all', async (req, res) => {
  try {
    const bicicletas = await Bicicleta.find().limit(3000);
    res.json(bicicletas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;