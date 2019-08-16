const mongoose = require("mongoose");

const subcategoriaSchema = mongoose.Schema({
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
  },
  categoriaPri:{ type: mongoose.Schema.Types.ObjectId, ref: 'categoriapri' }
});

module.exports = mongoose.model(`subcategoria`, subcategoriaSchema);