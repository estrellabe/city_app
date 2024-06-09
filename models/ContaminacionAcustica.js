var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var ContaminacionAcusticaSchema = new Schema({
  _id: { type: ObjectId, auto: true },
  FECHA: { type: Date, required: true },
  NMT: { type: Number, required: true },
  NOMBRE: { type: String, required: true },
  Ld: { type: Number },
  Le: { type: Number },
  Ln: { type: Number },
  LAeq24: { type: Number },
  LAS01: { type: Number },
  LAS10: { type: Number },
  LAS50: { type: Number },
  LAS90: { type: Number },
  LAS99: { type: Number },
  ANO: { type: Number, required: true },
  MES_STR: { type: String, required: true },
  MES: { type: Number, required: true }
});

module.exports = mongoose.model("ContaminacionAcustica", ContaminacionAcusticaSchema);