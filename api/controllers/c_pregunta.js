const mongoose = require("mongoose");
const pregunta = require(`../models/m_pregunta`);

// Publicar
exports.post = (req, res, next) => {
  // Definicion de objeto
  var ObjectId = mongoose.Types.ObjectId;
  const result = new pregunta({
    _id: new mongoose.Types.ObjectId(),
    pregunta: req.body.pregunta,
    respuesta: req.body.respuesta,
    posiblesR: req.body.posiblesR,
    respuestaC: req.body.respuestaC,
    tipoPregunta: req.body.tipoPregunta,
    subcategoria: new ObjectId(req.body.subcategoria)
  });

  // Respuesta de servidor
  result.save()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};

// Imprimir
exports.getAll = (req, res, next) => {
  pregunta.find()
       .select('_id pregunta posiblesR respuesta respuestaC tipoPregunta subcategoria created_at')
       .exec()
        .then(doc => {
            res.status(200).json(doc);
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
}

// Borrar
exports.borrar = (req, res, next) => {
  const idNumbre = req.params.id;
  pregunta.remove({ _id: idNumbre })
      .exec()
      .then(doc => {
          if (doc) {
              res.status(200).json(doc);
          } else {
              res.status(404).json({ message: 'No es valido el parametro enviado' });
          }
      }).catch(err => {
          res.status(500).json({ error: err })
      });
}

// Buscar por Subcategoria
exports.getBySubcategoria = (req, res, next) => {
    const subcatego = req.params.subcatego;
    pregunta.find()
        .where('subcategoria').equals(subcatego)
        .select('_id pregunta posiblesR respuesta respuestaC tipoPregunta subcategoria created_att ')
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
}

// Buscar
exports.buscar = (req, res, next) => {
    const idNumbre = req.params.id
    pregunta.findById(idNumbre)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: 'No es valido el parametro enviado' });
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
}

// Buscar por tipo de Pregunta
exports.getByTipoPregunta = (req, res, next) => {
    const tipo = req.params.tipo;
    pregunta.find()
        .where('tipoPregunta').equals(tipo)
        .select('_id pregunta posiblesR respuesta respuestaC tipoPregunta created_at')
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
}

// Actualizar
exports.actualizar = (req, res, next) => {
    console.log(req.body);
    const idNumbre = req.params.id;
    console.log(idNumbre);
    const updateOps = {};
    
    /*for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
        console.log(updateOps);
    }*/

    pregunta.update({ _id: idNumbre }, { $set: req.body /*updateOps*/ })
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: 'No es valido el parametro enviado' });
            }
        }).catch(err => {
            res.status(500).json({ error: err })
        });

} 


