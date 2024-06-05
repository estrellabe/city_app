/*Backend */
//aquí se definen las rutas y operaciones CRUD para el modelo Multas
var express = require("express");
var mongoose = require("mongoose");
mongoose.set('strictQuery', false);
var router = express.Router();
var debug = require("debug")("cityplus:server");

//Models
var Multas = require("../models/Multas.js");

var db = mongoose.connection;

/* GET multas listing */
router.get("/multas/", function (req, res) {
  Multas.find().exec(function (err, multas) {
    if (err) res.status(500).send(err);
    else res.status(200).json(multas);
  });
});

/* GET (devolver) una sola multa by Id */
router.get("/multas/:id", function (req, res, next) {
  Multas.findById(req.params.id, function (err, multasinfo) {
    if (err) res.status(500).send(err);
    else res.status(200).json(multasinfo);
  });
});

/*POST (añadir) nueva multa*/
router.post('/multa/', function (req, res) {
  Multas.create(req.body, function (err, multasinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

/*PUT (actualizar) una multa*/
router.put('/multas/:id', function (req, res){
  Multas.findByIdAndUpdate(req.params.id, req.body, function (err, multasinfo){
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

/*DELETE (borrar) una multa*/
router.delete('/multas/:id', function (req, res){
  Multas.findByIdAndDelete(req.params.id, req.body, function (err, multasinfo){
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

module.exports = router;