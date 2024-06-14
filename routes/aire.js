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

// Obtener los registros de aire por municipio - GET
router.get("/municipio/:municipio", async (req, res) => {
  try {
    const municipio = req.params.municipio;

    const aireData = await Aire.aggregate([
      { $match: { municipio: municipio } },
      {
        $group: {
          _id: { month: { $month: "$date"}},
          avg: { $avg: "$value" }
        }
      },
      {
        $sort: { "_id.month": 1 }
      }
    ]);

    // Transformacion de los datos y cálculo de la media mensual
    const datosTransformados = aireData.map(entry => ({
      date: new Date(entry._id.month - 1),
      value: entry.avg
    }));
    console.log('Datos originales: ', aireData);
    console.log('Datos transformados: ', datosTransformados);
    res.json(datosTransformados);
  } catch (error) {
    console.error('Error al obtener los datos: ', error);
    res.status(500).send('Error al obtener los datos');
  }
});

// Obtener todos los registros de aire - GET
router.get('/', async (req, res) => {
  try {
    const aireData = await Aire.find();
    console.log('Datos originales:', aireData); // Verificar los datos originales
    
    // Transformar los datos
    const datosTransformados = aireData.map(entry => {
      const date = new Date(entry.ano, entry.mes - 1, entry.dia);
      const values = [];
      
      for (let i = 1; i <= 24; i++) {
        const HKey = `H${i.toString().padStart(2, '0')}`;
        const VKey = `V${i.toString().padStart(2, '0')}`;
        
        if (entry[VKey] === 'V') {
          values.push({ date: new Date(date.getTime() + (i - 1) * 60 * 60 * 1000), value: entry[HKey] });
        }
      }

      return values;
    }).flat();

    console.log('Datos transformados:', datosTransformados); // Verificar los datos transformados
    res.json(datosTransformados);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).send(error);
  }
});

module.exports = router;