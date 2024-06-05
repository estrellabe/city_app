/*Backend */
//aquí se definen las rutas y operaciones CRUD para el modelo Aire
//ToDo: Terminar de implementar las funciones POST, PUT y DELETE
var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var debug = require("debug")("cityplus:server");

//Models
var Aire = require("../models/Aire.js");

var db = mongoose.connection;

/* GET aire listing */
router.get("/aire/", function (req, res) {
  Aire.find().exec(function (err, aire) {
    if (err) res.status(500).send(err);
    else res.status(200).json(aire);
  });
});

/* GET single aire by Id */
router.get("/aire/:id", function (req, res, next) {
  Aire.findById(req.params.id, function (err, aireinfo) {
    if (err) res.status(500).send(err);
    else res.status(200).json(aireinfo);
  });
});

/*POST (añadir) nuevo aire*/
//Todo: Implementar la función POST para añadir un nuevo registro de aire

/*PUT (actualizar) un aire*/
//Todo: Implementar la función PUT para actualizar un registro de aire

/*DELETE (borrar) un aire*/
//Todo: Implementar la función DELETE para borrar un registro de aire

module.exports = router;