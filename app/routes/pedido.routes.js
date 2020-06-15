module.exports = app => {
  const pedidos = require("../controllers/pedido.controller");

  var router = require("express").Router();

  // Crear un nuevo pedido
  router.post("/pedidos", pedidos.create);

  // Obtener todos los pedidos
  router.get("/pedidos", pedidos.findAll);

  // Obtener un pedido por su id
  router.get("/pedidos/:id", pedidos.findOne);

  // Modificar un pedido por su id
  router.put("/pedidos/:id", pedidos.update);

  // Borrar un pedido por su id
  router.delete("/pedidos/:id", pedidos.delete);

  // Crear un nuevo pedido
  router.delete("/pedidos", pedidos.deleteAll);

  app.use('/libreria', router);
};