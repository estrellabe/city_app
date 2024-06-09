// Propósito: Definir las rutas y operaciones CRUD para el modelo Aire
var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var debug = require("debug")("cityplus:server");
var db = mongoose.connection;

// Modelo de datos
var Aire = require("../models/Aire");

// Conexión a la base de datos
db.on("error", console.error.bind(console, "Error de conexión con la BD: "));
db.once("open", function () {
  debug("BD conectada correctamente");
});

// Crear nuevo registro de aire - POST
router.post("/", async (req, res) => {
  try {
    const registro = new Aire(req.body);
    await registro.save();
    res.status(201).json(registro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los registros de aire - GET
router.get("/", async (req, res) => {
  try {
    const registros = await Aire.find();
    res.json(registros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un registro de aire (ID) - GET
router.get("/:id", async (req, res) => {
  try {
    const registro = await Aire.findById(req.params.id);
    if (!registro) return res.status(404).json({ error: "Registro no encontrado"});
    res.json(registro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un registro de aire (ID) - PUT
router.put("/:id", async (req, res) => {
  try {
    const registro = await Aire.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!registro) return res.status(404).json({ error: "Registro no encontrado" });
    res.json(registro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un registro de aire (ID) - DELETE
router.delete("/:id", async (req, res) => {
  try {
    const registro = await Aire.findByIdAndDelete(req.params.id);
    if (!registro) return res.status(404).json({ error: "Registro no encontrado" });
    res.json({ message: "Registro eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;