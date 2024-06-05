/*Backend */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var MultasSchema = new Schema({
  _id: {type: ObjectId, auto: true},
  calificacion: String,
  Lugar: String,
  Mes: Number,
  Ano: Number,
  Hora: Number,
  IMP_BOL: Number,
  Descuento: String,
  Puntos: Number,
  Denunciante: String,
  Hecho_Bol: String,
});
module.exports = mongoose.model("Multas", MultasSchema); // define el modelo