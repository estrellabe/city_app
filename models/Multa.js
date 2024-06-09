var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var MultaSchema = new Schema({
  _id: { type: ObjectId, auto: true },
  CALIFICACION: { type: String, required: true },
  LUGAR: { type: String, required: true }, // Calle
  MES: { type: Number, required: true },
  ANO: { type: Number, required: true },
  HORA: { type: String, required: true },
  IMP_BOL: { type: Number, required: true },
  DESCUENTO: { type: String, required: true },
  PUNTOS: { type: Number, required: true },
  DENUNCIANTE: { type: String, required: true },
  HECHO_BOL: { type: String, required: true },
  VEL_LIMITE: { type: Number, required: true },
  VEL_CIRCULA: { type: Number, required: true },
  COORDENADA_X: { type: Number },
  COORDENADA_Y: { type: Number }
});
module.exports = mongoose.model("Multa", MultaSchema); // define el modelo