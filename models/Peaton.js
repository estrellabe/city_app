var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var PeatonSchema = new Schema({
  _id: { type: ObjectId, auto: true },
  FECHA: { type: Date, required: true },
  HORA: { type: String, required: true },
  IDENTIFICADOR: { type: String, required: true },
  PEATONES: { type: Number, required: true },
  NUMERO_DISTRITO: { type: Number, required: true },
  DISTRITO: { type: String, required: true },
  NOMBRE_VIAL: { type: String, required: true },
  NUMERO: { type: Number, required: true },
  CODIGO_POSTAL: { type: Number, required: true },
  OBSERVACIONES_DIRECCION: { type: String },
  LATITUD: { type: Number, required: true },
  LONGITUD: { type: Number, required: true },
  ANO: { type: Number, required: true },
  MES: { type: Number, required: true },
  DIA: { type: Number, required: true }
});

module.exports = mongoose.model("Peaton", PeatonSchema, "peatones");