/*Backend */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var AireSchema = new Schema({
  _id: {type: ObjectId, auto: true},
  provincia: Number,
  Municipio: Number,
  Estacion: Number,
  Punto_muestreo: String,
  Ano: Number,
  Mes: Number,
  Dia: Number,
});
module.exports = mongoose.model("Aire", AireSchema); // define el modelo