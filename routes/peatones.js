var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var debug = require("debug")("cityplus:server");
var db = mongoose.connection;

//Modelo de datos
var Peaton = require('../models/Peaton');

// Conexión a la base de datos
db.on("error", console.error.bind(console, "Error de conexión con la BD: "));
db.once("open", function () {
  debug("BD conectada correctamente");
});

// Obtener los registros de todos los peatones - GET
router.get('/all', async (req, res) => {
  try {
    const peatones = await Peaton.find().limit(1000);
    res.json(peatones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;