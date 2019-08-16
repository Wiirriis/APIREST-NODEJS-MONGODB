const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const controller = require(`../controllers/c_categoriapri`);

router.get(`/`, controller.getAll)
.post(`/`, controller.post);

router.get('/:id',controller.buscar)
.delete('/:id', controller.borrar)
.patch('/:id',controller.actualizar);

module.exports = router;
