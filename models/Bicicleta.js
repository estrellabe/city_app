var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// Modelo basado en: bicicleta_aforo.csv
var BicicletaSchema = new Schema({
  _id: { type: ObjectId, auto: true },
  fecha: { type: String, required: true },
  hora: { type: String, required: true },
  identificador: { type: String, required: true },
  bicicletas: { type: Number, required: true },
  numero_distrito: { type: Number, required: true },
  distrito: { type: String, required: true },
  nombre_vial: { type: String, required: true },
  numero: { type: Number, required: true },
  codigo_postal: { type: Number, required: true },
  observaciones_direccion: { type: String },
  latitud: { type: Number, required: true },
  longitud: { type: Number, required: true },
  ano: { type: Number, required: true },
  mes: { type: Number, required: true },
  dia: { type: Number, required: true }
});

module.exports = mongoose.model("Bicicleta", BicicletaSchema);