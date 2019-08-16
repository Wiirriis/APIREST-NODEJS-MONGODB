const mongoose = require("mongoose");
const subcategorias = require(`../models/m_subcategoria`);

// Publicar
exports.post = (req, res, next) => {
  // Definicion de objeto
  var ObjectId = mongoose.Types.ObjectId
  const result = new subcategorias({
    _id: new mongoose.Types.ObjectId(),
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    categoriaPri: new ObjectId(req.body.categoriaPri)
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
  subcategorias.find()
       .select('_id nombre descripcion created_at ')
       .populate('categoriapri', ['nombre'])
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
  subcategorias.remove({ _id: idNumbre })
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

// Buscar
exports.buscar = (req, res, next) => {
    const idNumbre = req.params.id
    subcategorias.findById(idNumbre)
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

// Buscar por Categoria
exports.getByCategoria = (req, res, next) => {
    const catego = req.params.catego;
    subcategorias.find()
        .where('categoriaPri').equals(catego)
        .select('_id nombre descripcion categoriaPri created_at ')
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

    subcategorias.update({ _id: idNumbre }, { $set: req.body /*updateOps*/ })
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


