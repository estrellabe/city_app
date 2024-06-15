// Propósito: Manejar las rutas de la API para los registros de Censo
var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var debug = require("debug")("cityplus:server");
var db = mongoose.connection;

// Modelo de datos
var Censo = require("../models/Censo");

// Conexión a la base de datos
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function() {
  debug("MongoDB connected");
});

// Obtener todos los registros de censo - GET
router.get("/all", async (req, res) => {
  try {
    const registros = await Censo.find().limit(15000); // Solo consideramos los 15000 primeros registros
    res.json(registros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener registros de censo por distrito - No utilizada
router.get("/distrito/:distrito", async (req, res) => {
  try {
    const registros = await Censo.find({ DISTRITO: req.params.distrito });
    if (!registros) return res.status(404).json({ error: "Registro no encontrado" });
    res.json(registros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;