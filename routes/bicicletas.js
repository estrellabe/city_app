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
router.get('/', async (req, res) => {
  try {
    const bicicletas = await Bicicleta.find();
    res.json(bicicletas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener una bicicleta por ID - GET
router.get('/:id', async (req, res) => {
  try {
    const bicicleta = await Bicicleta.findById(req.params.id);
    if (!bicicleta) return res.status(404).json({ error: 'Bicicleta no encontrada' });
    res.json(bicicleta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener bicicletas por distrito - GET
router.get('/distrito/:distrito', async (req, res) => {
  try {
    const bicicletas = await Bicicleta.find({ distrito: req.params.distrito });
    if (!bicicletas) return res.status(404).json({ error: 'Bicicleta no encontrada' });
    res.json(bicicletas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener bicicletas por mes - GET
router.get('/mes/:mes', async (req, res) => {
  try {
    const bicicletas = await Bicicleta.find({ mes: req.params.mes });
    if (!bicicletas) return res.status(404).json({ error: 'Bicicleta no encontrada' });
    res.json(bicicletas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener bicicletas por distrito y mes - GET
router.get('/distrito/:distrito/mes/:mes', async (req, res) => {
  try {
    const bicicletas = await Bicicleta.find({ distrito: req.params.distrito, mes: req.params.mes });
    if (!bicicletas) return res.status(404).json({ error: 'Bicicleta no encontrada' });
    res.json(bicicletas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener bicicletas por hora - GET
router.get('/hora/:hora', async (req, res) => {
  try {
    const bicicletas = await Bicicleta.find({ hora: req.params.hora });
    if (!bicicletas) return res.status(404).json({ error: 'Bicicleta no encontrada' });
    res.json(bicicletas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar una bicicleta por ID - PUT
router.put('/:id', async (req, res) => {
  try {
    const bicicleta = await Bicicleta.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!bicicleta) return res.status(404).json({ error: 'Bicicleta no encontrada' });
    res.json(bicicleta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar una bicicleta por ID - DELETE
router.delete('/:id', async (req, res) => {
  try {
    const bicicleta = await Bicicleta.findByIdAndDelete(req.params.id);
    if (!bicicleta) return res.status(404).json({ error: 'Bicicleta no encontrada' });
    res.json({ message: 'Bicicleta eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;