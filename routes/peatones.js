//Proposito: Contiene las rutas y metodos HTTP el modelo Peaton.
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

// Crear un nuevo registro de peaton - POST
router.post('/', async (req, res) => {
  try {
    const peaton = new Peaton(req.body);
    await peaton.save();
    res.status(201).json(peaton);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener los registros de todos los peatones - GET
router.get('/', async (req, res) => {
  try {
    const peatones = await Peaton.find();
    res.json(peatones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un registro de peaton (ID) - GET
router.get('/:id', async (req, res) => {
  try {
    const peaton = await Peaton.findById(req.params.id);
    if (!peaton) return res.status(404).json({ error: 'Registro de peaton no encontrado' });
    res.json(peaton);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener registros de peaton por mes - GET
router.get('/mes/:mes', async (req, res) => {
  try {
    const peatones = await Peaton.find({ MES: req.params.mes });
    if (!peatones) return res.status(404).json({ error: 'Registro de peaton no encontrado' });
    res.json(peatones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener registros de peaton por distrito - GET
router.get('/distrito/:distrito', async (req, res) => {
  try {
    const peatones = await Peaton.find({ DISTRITO: req.params.distrito });
    if (!peatones) return res.status(404).json({ error: 'Registro de peaton no encontrado' });
    res.json(peatones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener registros de peaton por municipio - GET
router.get('/municipio/:municipio', async (req, res) => {
  try {
    const peatones = await Peaton.find({ MUNICIPIO: req.params.municipio });
    if (!peatones) return res.status(404).json({ error: 'Registro de peaton no encontrado' });
    res.json(peatones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener registros de peaton por identificador - GET
router.get('/identificador/:identificador', async (req, res) => {
  try {
    const peatones = await Peaton.find({ IDENTIFICADOR: req.params.identificador });
    if (!peatones) return res.status(404).json({ error: 'Registro de peaton no encontrado' });
    res.json(peatones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener registros de peaton por hora - GET
router.get('/hora/:hora', async (req, res) => {
  try {
    const peatones = await Peaton.find({ HORA: req.params.hora });
    if (!peatones) return res.status(404).json({ error: 'Registro de peaton no encontrado' });
    res.json(peatones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un registro de peaton (ID) - PUT
router.put('/:id', async (req, res) => {
  try {
    const peaton = await Peaton.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!peaton) return res.status(404).json({ error: 'Registro de peaton no encontrado' });
    res.json(peaton);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un registro de peaton (ID) - DELETE
router.delete('/:id', async (req, res) => {
  try {
    const peaton = await Peaton.findByIdAndDelete(req.params.id);
    if (!peaton) return res.status(404).json({ error: 'Registro de peaton no encontrado' });
    res.json({ message: 'Registro de peaton eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;