var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var ContenedorSchema = new Schema({
  _id: { type: ObjectId, auto: true },
  CODIGO_INTERNO: { type: Number, required: true },
  TIPO_CONTENEDOR: { type: String, required: true },
  MODELO: { type: String },
  DESCRIPCION_MODELO: { type: String },
  CANTIDAD: { type: Number, required: true },
  LOTE: { type: Number, required: true },
  DISTRITO: { type: String, required: true },
  BARRIO: { type: String, required: true },
  TIPO_VIA: { type: String, required: true },
  NOMBRE: { type: String, required: true },
  NUMERO: { type: Number, required: true },
  COORDENADA_X: { type: Number },
  COORDENADA_Y: { type: Number },
  LONGITUD: { type: Number , required: true},
  LATITUD: { type: Number , required: true},
  DIRECCION: { type: String }
});

module.exports = mongoose.model("Contenedor", ContenedorSchema, "contenedores");