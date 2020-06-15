module.exports = app => {
  const lineas_pedidos_proveedores = require("../controllers/linea_pedido_proveedor.controller");

  var router = require("express").Router();

  // Crear una nueva linea_pedido
  router.post("/lineas_pedidos_proveedores", lineas_pedidos_proveedores.create);

  // Obtener todas las lineas_pedidos
  router.get("/lineas_pedidos_proveedores", lineas_pedidos_proveedores.findAll);

  // Obtener una linea_pedido por su id
  router.get("/lineas_pedidos_proveedores/:id", lineas_pedidos_proveedores.findOne);

  // Modificar una linea_pedido por su id
  router.put("/lineas_pedidos_proveedores/:id", lineas_pedidos_proveedores.update);

  // Borrar una linea_pedido por su id
  router.delete("/lineas_pedidos_proveedores/:id", lineas_pedidos_proveedores.delete);

  // Crear una nueva linea_pedido
  router.delete("/lineas_pedidos_proveedores", lineas_pedidos_proveedores.deleteAll);

  app.use('/libreria', router);
};