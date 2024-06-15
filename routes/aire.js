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

// Obtener la media de la calidad del aire por mes
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



// Obtener los registros de aire por mes - No utilizada
router.get('/mes/:mes', async (req, res) => {
  const mes = parseInt(req.params.mes, 10);
  try {
    const data = await Aire.aggregate([
      { $match: { MES: mes } },
      {
        $group: {
          _id: { dia: "$DIA" },
          averageValue: { $avg: "$H01" }
        }
      },
      { $sort: { "_id.dia": 1 } }
    ]);
    res.json(data.map(item => ({
      date: new Date(2051, mes - 1, item._id.dia),
      value: item.averageValue
    })));
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});


// Obtener todos los registros de aire - No utilizada
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