
const mongoose = require("mongoose");

const alumnoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombre: {
    type: String,
    require: "Nombre es requerido"
  },
  edad: {
    type: Number
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model(`alumno`, alumnoSchema);