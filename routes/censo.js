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

// Crear un nuevo registro de censo - POST
router.post("/", async (req, res) => {
  try {
    const registro = new Censo(req.body);
    await registro.save();
    res.status(201).json(registro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los registros de censo - GET
router.get("/", async (req, res) => {
  try {
    const registros = await Censo.find();
    res.json(registros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un registro de censo (ID) - GET
router.get("/:id", async (req, res) => {
  try {
    const registro = await Censo.findById(req.params.id);
    if (!registro) return res.status(404).json({ error: "Registro no encontrado" });
    res.json(registro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener registros de censo por distrito - GET
router.get("/distrito/:distrito", async (req, res) => {
  try {
    const registros = await Censo.find({ DISTRITO: req.params.distrito });
    if (!registros) return res.status(404).json({ error: "Registro no encontrado" });
    res.json(registros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un registro de censo (ID) - PUT
router.put("/:id", async (req, res) => {
  try {
    const registro = await Censo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!registro) return res.status(404).json({ error: "Registro no encontrado" });
    res.json(registro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un registro de censo (ID) - DELETE
router.delete("/:id", async (req, res) => {
  try {
    const registro = await Censo.findByIdAndDelete(req.params.id);
    if (!registro) return res.status(404).json({ error: "Registro no encontrado" });
    res.json({ message: "Registro eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;