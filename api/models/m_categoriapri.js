const mongoose = require("mongoose");

const categoriapriSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombre: {
    type: String,
    require: "Nombre es requerido"
  },
  descripcion: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model(`categoriapri`, categoriapriSchema);