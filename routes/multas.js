// Propósito: Manejar las rutas y operaciones CRUD para el modelo Multa
var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var debug = require("debug")("cityplus:server");
var db = mongoose.connection;

//Modelo de datos
var Multa = require("../models/Multa");

// Conexión a la base de datos
db.on("error", console.error.bind(console, "Error de conexión con la BD: "));
db.once("open", function () {
  debug("BD conectada correctamente");
});

// Crear una nueva multa - POST
router.post("/", async (req, res) => {
  try {
    const multa = new Multa(req.body);
    await multa.save();
    res.status(201).send(multa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  });

// Obtener todas las multas - GET
router.get("/", async (req, res) => {
  try {
    const multas = await Multa.find();
    res.json(multas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener una multa por ID - GET
router.get("/:id", async (req, res) => {
  try {
    const multa = await Multa.findById(req.params.id);
    if (!multa) return res.status(404).json({ error: "Multa no encontrada" });
    res.json(multa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener multas por mes - GET
router.get("/mes/:mes", async (req, res) => {
  try {
    const multas = await Multa.find({ MES: req.params.mes });
    if (!multas) return res.status(404).json({ error: "Multa no encontrada" });
    res.json(multas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener multas por denunciante - GET
router.get("/denunciante/:denunciante", async (req, res) => {
  try {
    const multas = await Multa.find({ DENUNCIANTE: req.params.denunciante });
    if (!multas) return res.status(404).json({ error: "Multa no encontrada" });
    res.json(multas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener multas por hora - GET
router.get("/hora/:hora", async (req, res) => {
  try {
    const multas = await Multa.find({ HORA: req.params.hora });
    if (!multas) return res.status(404).json({ error: "Multa no encontrada" });
    res.json(multas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener multas por calificación - GET
router.get("/calificacion/:calificacion", async (req, res) => {
  try {
    const multas = await Multa.find({ CALIFICACION: req.params.calificacion });
    if (!multas) return res.status(404).json({ error: "Multa no encontrada" });
    res.json(multas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar una multa por ID - PUT
router.put("/:id", async (req, res) => {
  try {
    const multa = await Multa.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!multa) return res.status(404).json({ error: "Multa no encontrada" });
    res.json(multa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar una multa por ID - DELETE
router.delete("/:id", async (req, res) => {
  try {
    const multa = await Multa.findByIdAndDelete(req.params.id);
    if (!multa) return res.status(404).json({ error: "Multa no encontrada" });
    res.json(multa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;