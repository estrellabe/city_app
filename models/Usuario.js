// Este modelo se utilizará para la autenticacion de usuarios con Google
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
  googleID: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

module.exports = mongoose.model("Usuario", UsuarioSchema);