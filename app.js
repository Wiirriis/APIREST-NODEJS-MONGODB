const express = require("express");
var cors = require("cors");
const path = require('path');
const session = require('express-session');
const errorHandler = require('errorhandler');
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").load();


//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

//example inicio
const RoutePersonas = require("./api/routes/example/persona");
const RouteGrados = require("./api/routes/example/grado");
const RouteCursos = require("./api/routes/example/curso");
const RouteAsignaciones = require("./api/routes/example/asignacion");
//example fin

const RouteAlumno = require('./api/routes/r_alumno');
const RouteCategoriaPri = require('./api/routes/r_categoriapri');
const RouteSubcategoria = require('./api/routes/r_subcategoria');
const RoutePregunta = require('./api/routes/r_pregunta');

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGO_ATLAS,
  { useNewUrlParser: true }
);
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(cors());
app.use(morgan("dev"));
app.use("/upload", express.static("upload"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'kervinsdb', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

if(!isProduction) {
  app.use(errorHandler());
}

//Models & routes
require('./api/models/Users');
require('./api/config/passport');
app.use(require('./api/routes'));




// inicio example
app.use("/personas", RoutePersonas);
app.use("/grados", RouteGrados);
app.use("/cursos", RouteCursos);
app.use("/asignaciones", RouteAsignaciones);
// fin example

app.use('/alumno',RouteAlumno);
app.use('/categoriapri',RouteCategoriaPri);
app.use('/subcategoria',RouteSubcategoria);
app.use('/pregunta',RoutePregunta);


app.use((req, res, net) => {
  const error = new Error("Not Found");
  error.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
