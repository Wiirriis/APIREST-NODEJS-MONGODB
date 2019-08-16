const mongoose = require("mongoose");


const preguntaSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  pregunta: {
    type: String,
    require: "Pregunta es requerida"
  },
  respuesta: {
    type: String,
    require: "Respuesta es requerida"
  },
  posiblesR: {
    type: [String]
  },
  tipoPregunta: {
    type: String,
    enum: ['directa', 'opcionM', 'opcionVF'],
    default: 'directa'
  },
  respuestaC: {
    type: String,
    require: "Respuesta Correcta es requerida"
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  subcategoria: { type: mongoose.Schema.Types.ObjectId, ref: 'subcategoria' }
});

module.exports = mongoose.model('pregunta', preguntaSchema);
