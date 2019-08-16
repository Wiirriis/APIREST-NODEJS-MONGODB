const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const controller = require(`../controllers/c_pregunta`);

router.get(`/`, controller.getAll)
.post(`/`, controller.post);

router.get('/:id',controller.buscar)
.get('/t/:tipo',controller.getByTipoPregunta)
.get('/s/:subcatego',controller.getBySubcategoria)
.delete('/:id', controller.borrar)
.patch('/:id',controller.actualizar);

module.exports = router;
