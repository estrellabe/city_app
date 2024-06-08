// Backend
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var debug = require('debug')('cityplus:server');//////NUEVO: Para poder usar variables de entorno
require("dotenv").config();

var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var cors = require("cors");

var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");
var aireRouter = require("./routes/aire");
var multasRouter = require("./routes/multas");

var app = express();

// Inicialización de passport
app.use(passport.initialize());

// Congiguración de middlewares
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Conexión a la base de datos de MongoDB Atlas
mongoose
  .connect(process.env.DB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
  ).then(() => debug("MongoDB Atlas DataBase connection successful")
  ).catch((err) => debug("MongoDB Atlas DataBase connection (URI) error: ", err));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Configuración de rutas
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/aire", aireRouter);
app.use("/multas", multasRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
