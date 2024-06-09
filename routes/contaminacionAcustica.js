// Propósito: Manejar las rutas y operaciones CRUD para los registros de contaminación acústica
var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var debug = require("debug")("cityplus:server");
var db = mongoose.connection;

//Model de datos
var ContaminacionAcustica = require('../models/ContaminacionAcustica');

// Conexión a la base de datos
db.on("error", console.error.bind(console, "Error de conexión con la BD: "));
db.once("open", function () {
  debug("BD conectada correctamente");
});

// Crear un nuevo registro de contaminación acústica
router.post('/', async (req, res) => {
  try {
    const registro = new ContaminacionAcustica(req.body);
    await registro.save();
    res.status(201).json(registro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los registros de contaminación acústica - GET
router.get('/', async (req, res) => {
  try {
    const registros = await ContaminacionAcustica.find();
    res.json(registros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un registro de contaminación acústica (ID)   - GET
router.get('/:id', async (req, res) => {
  try {
    const registro = await ContaminacionAcustica.findById(req.params.id);
    if (!registro) return res.status(404).json({ error: 'Registro no encontrado' });
    res.json(registro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener registros de contaminación acústica por mes - GET
router.get('/mes/:mes', async (req, res) => {
  try {
    const registros = await ContaminacionAcustica.find({ MES: req.params.mes });
    if (!registros) return res.status(404).json({ error: 'Registro no encontrado' });
    res.json(registros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un registro de contaminación acústica (ID) - PUT
router.put('/:id', async (req, res) => {
  try {
    const registro = await ContaminacionAcustica.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!registro) return res.status(404).json({ error: 'Registro no encontrado' });
    res.json(registro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un registro de contaminación acústica (ID) - DELETE
router.delete('/:id', async (req, res) => {
  try {
    const registro = await ContaminacionAcustica.findByIdAndDelete(req.params.id);
    if (!registro) return res.status(404).json({ error: 'Registro no encontrado' });
    res.json({ message: 'Registro eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;