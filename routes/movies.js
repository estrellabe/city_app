var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var debug = require("debug")("moviesApp:server");

//Models
var Movie = require("../models/Movie.js");

var db = mongoose.connection;

/* GET movies listing */
router.get("/", function (req, res) {
  Movie.find().then(function(movies){
    res.status(200).json(movies)
  }).catch(function(err){
    res.status(500).send(err)
  });
});

/* GET single movie by Id */
router.get("/:id", function (req, res, next) {
  Movie.findById(req.params.id, function (err, movieinfo) {
    if (err) res.status(500).send(err);
    else res.status(200).json(movieinfo);
  });
});

/* POST a new movie*/
router.post("/", function (req, res) {
  Movie.create(req.body, function (err, movieinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});


module.exports = router;