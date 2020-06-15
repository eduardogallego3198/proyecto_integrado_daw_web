module.exports = app => {
    const pedidos_proveedores = require("../controllers/pedido_proveedor.controller");
  
    var router = require("express").Router();
  
    // Crear un nuevo pedido_proveedor
    router.post("/pedidos_proveedores", pedidos_proveedores.create);
  
    // Obtener todos los pedidos_proveedores
    router.get("/pedidos_proveedores", pedidos_proveedores.findAll);
  
    // Obtener un pedido_proveedor por su id
    router.get("/pedidos_proveedores/:id", pedidos_proveedores.findOne);
  
    // Modificar un pedido_proveedor por su id
    router.put("/pedidos_proveedores/:id", pedidos_proveedores.update);
  
    // Borrar un pedido_proveedor por su id
    router.delete("/pedidos_proveedores/:id", pedidos_proveedores.delete);
  
    // Crear un nuevo pedido_proveedor
    router.delete("/pedidos_proveedores", pedidos_proveedores.deleteAll);
  
    app.use('/libreria', router);
  };