// Propósito: Definir las rutas y operaciones CRUD para el modelo Aire
var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var debug = require("debug")("cityplus:server");
var db = mongoose.connection;

// Modelo de datos
var Aire = require("../models/Aire");

// Conexión a la base de datos
/*
db.on("error", console.error.bind(console, "Error de conexión con la BD: "));
db.once("open", function () {
  debug("BD conectada correctamente");
});
*/

// Obtener los registros de aire por mes - GET
router.get('/mes/:mes', async (req, res) => {
  try {
    const mes = parseInt(req.params.mes, 10);
    const datosAire = await Aire.find({ MES: mes });
    const datosTransformados = datosAire.map(dato => ({
      date: new Date(dato.MES - 1, dato.DIA),
      value: dato.H01
    }));
    console.log('Datos originales:', datosAire);
    console.log('Datos transformados:', datosTransformados);
    res.json(datosTransformados);
  } catch (error) {
    console.error('Error al obtener los datos de calidad del aire:', error);
    res.status(500).json({ error: 'Error al obtener los datos de calidad del aire' });
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