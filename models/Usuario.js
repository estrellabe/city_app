var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

module.exports = mongoose.model("Usuario", UsuarioSchema);