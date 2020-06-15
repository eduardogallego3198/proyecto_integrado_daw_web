module.exports = app => {
  const lineas_pedidos = require("../controllers/linea_pedido.controller");

  var router = require("express").Router();

  // Crear una nueva linea_pedido
  router.post("/lineas_pedidos", lineas_pedidos.create);

  // Obtener todas las lineas_pedidos
  router.get("/lineas_pedidos", lineas_pedidos.findAll);

  // Obtener una linea_pedido por su id
  router.get("/lineas_pedidos/:id", lineas_pedidos.findOne);

  // Modificar una linea_pedido por su id
  router.put("/lineas_pedidos/:id", lineas_pedidos.update);

  // Borrar una linea_pedido por su id
  router.delete("/lineas_pedidos/:id", lineas_pedidos.delete);

  // Crear una nueva linea_pedido
  router.delete("/lineas_pedidos/", lineas_pedidos.deleteAll);

  app.use('/libreria', router);
};