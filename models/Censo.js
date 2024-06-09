var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var CensoSchema = new Schema({
  _id: { type: ObjectId, auto: true },
  COD_DISTRITO: { type: Number, required: true },
  DESC_DISTRITO: { type: String, required: true },
  COD_DIST_BARRIO: { type: Number, required: true },
  DESC_BARRIO: { type: String, required: true },
  COD_BARRIO: { type: Number, required: true },
  COD_DIST_SECCION: { type: Number, required: true },
  COD_SECCION: { type: Number, required: true },
  COD_EDAD_INT: { type: Number, required: true },
  EspanolesHombres: { type: Number },
  EspanolesMujeres: { type: Number },
  ExtranjerosHombres: { type: Number },
  ExtranjerosMujeres: { type: Number }
});

module.exports = mongoose.model("Censo", CensoSchema);