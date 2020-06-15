module.exports = app => {
  const respuestas = require("../controllers/respuesta.controller");

  var router = require("express").Router();

  // Crear un nuevo pedido
  router.post("/respuestas", respuestas.create);

  // Obtener todos los respuestas
  router.get("/respuestas", respuestas.findAll);

  // Obtener un pedido por su id
  router.get("/respuestas/:id", respuestas.findOne);

  // Modificar un pedido por su id
  router.put("/respuestas/:id", respuestas.update);

  // Borrar un pedido por su id
  router.delete("/respuestas/:id", respuestas.delete);

  // Crear un nuevo pedido
  router.delete("/respuestas", respuestas.deleteAll);

  app.use('/libreria', router);
};