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
// Obtener los registros de aire por municipio - GET
router.get("/municipio/:municipio", async (req, res) => {
  try {
    const municipio = req.params.municipio;
    const aireData = await Aire.find({ MUNICIPIO: municipio });
    console.log('Datos originales:', aireData); // Ahora hay que transformarlos

    // Transformacion de los datos y cálculo de la media mensual
    const mediaMensual = {};

    aireData.forEach(entry => {
      const mes = `${entry.ano}-${entry.mes.toString().padStart(2, '0')}`;

      if (!mediaMensual[mes]) {
        mediaMensual[mes] = { total: 0, count: 0 };
      }

      for (let i = 1; i <= 24; i++) {
        const HKey = `H${i.toString().padStart(2, '0')}`;
        const VKey = `V${i.toString().padStart(2, '0')}`;

        if (entry[VKey] === 'V') {
          mediaMensual[mes].total += entry[HKey];
          mediaMensual[mes].count+= 1;
        }
      }
    });

    const datosTransformados = Object.keys(mediaMensual).map(mes => {
      return {
        mes: mes,
        media: mediaMensual[mes].total / mediaMensual[mes].count
      };
    });
  console.log('Datos transformados:', datosTransformados);
  res.json(datosTransformados);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).send(error);
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