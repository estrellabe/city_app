// Backend
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var debug = require('debug')('cityplus:server');
//////NUEVO: Para poder usar variables de entorno
require("dotenv").config();

var mongoose = require("mongoose");

var indexRouter = require("./routes/index");
var moviesRouter = require("./routes/movies"); //ToDo eliminar
var bookmarksRouter = require("./routes/bookmarks"); //ToDo eliminar
var usersRouter = require("./routes/users"); //ToDo eliminar
var authRouter = require("./routes/auth.js"); //To be implemented //TODO
var aireRouter = require("./routes/aire");
var multasRouter = require("./routes/multas");

var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


// MongoDB Atlas DB cluster connection
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

app.use("/", indexRouter);
//app.use("/routes/movies", moviesRouter); //ToDo eliminar
//app.use("/routes/bookmarks", bookmarksRouter); //ToDo eliminar
app.use("/routes/aire.js", aireRouter);
app.use("/routes/multas.js", multasRouter);

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
