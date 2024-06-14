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
router.get("/censo/all", async (req, res) => {
  try {
    const registros = await Censo.find();
    res.json(registros);
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

// Obtener registros de censo por codigo de barrio - GET
router.get('/media/anual', async (req, res) => {
  const mes = parseInt(req.params.month);
  try {
    const result = await Aire.aggregate([
      {
        $group: {
          _id: "$MES",
          avgValue: { 
            $avg: {
              $avg: [
                "$H01", "$H02", "$H03", "$H04", "$H05", "$H06", 
                "$H07", "$H08", "$H09", "$H10", "$H11", "$H12",
                "$H13", "$H14", "$H15", "$H16", "$H17", "$H18",
                "$H19", "$H20", "$H21", "$H22", "$H23", "$H24"
              ]
            }
          }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;