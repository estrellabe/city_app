// Propósito: Definir las rutas y operaciones CRUD para el modelo Contenedor
var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var debug = require("debug")("cityplus:server");
var db = mongoose.connection;

//Modelo de datos
var Contenedor = require('../models/Contenedor');

// Conexión a la base de datos
db.on("error", console.error.bind(console, "Error de conexión con la BD: "));
db.once("open", function () {
  debug("BD conectada correctamente");
});

// Crear un nuevo contenedor - POST
router.post('/', async (req, res) => {
  try {
    const contenedor = new Contenedor(req.body);
    await contenedor.save();
    res.status(201).json(contenedor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los contenedores - GET
router.get('/', async (req, res) => {
  try {
    const contenedores = await Contenedor.find();
    res.json(contenedores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un contenedor (ID)
router.get('/:id', async (req, res) => {
  try {
    const contenedor = await Contenedor.findById(req.params.id);
    if (!contenedor) return res.status(404).json({ error: 'Contenedor no encontrado' });
    res.json(contenedor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener contenedores por distrito - GET
router.get('/distrito/:distrito', async (req, res) => {
  try {
    const contenedores = await Contenedor.find({ DISTRITO: req.params.distrito });
    if (!contenedores) return res.status(404).json({ error: 'Contenedor no encontrado' });
    res.json(contenedores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener registros de contenedores por tipo - GET
router.get("/tipo/:tipo", async (req, res) => {
  try {
    const registros = await Contenedor.find({ TIPO_CONTENEDOR: req.params.tipo });
    res.json(registros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener registros de contenedores por modelo - GET
router.get("/modelo/:modelo", async (req, res) => {
  try {
    const registros = await Contenedor.find({ MODELO: req.params.modelo });
    res.json(registros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener registros de contenedores por municipio - GET
router.get("/municipio/:municipio", async (req, res) => {
  try {
    const registros = await Contenedor.find({ MUNICIPIO: req.params.municipio });
    res.json(registros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener registros de contenedores por barrio - GET
router.get("/barrio/:barrio", async (req, res) => {
  try {
    const registros = await Contenedor.find({ BARRIO: req.params.barrio });
    res.json(registros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un contenedor (ID) - PUT
router.put('/:id', async (req, res) => {
  try {
    const contenedor = await Contenedor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!contenedor) return res.status(404).json({ error: 'Contenedor no encontrado' });
    res.json(contenedor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un contenedor (ID) - DELETE
router.delete('/:id', async (req, res) => {
  try {
    const contenedor = await Contenedor.findByIdAndDelete(req.params.id);
    if (!contenedor) return res.status(404).json({ error: 'Contenedor no encontrado' });
    res.json({ message: 'Contenedor eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
