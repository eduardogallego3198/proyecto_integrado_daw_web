module.exports = app => {
    const facturas = require("../controllers/factura.controller");
  
    var router = require("express").Router();
  
    // Crear una nueva factura
    router.post("/facturas", facturas.create);
  
    // Obtener todas las facturas
    router.get("/facturas", facturas.findAll);
  
    // Obtener una factura por su id
    router.get("/facturas/:id", facturas.findOne);
  
    // Modificar una factura por su id
    router.put("/facturas/:id", facturas.update);
  
    // Borrar una factura por su id
    router.delete("/facturas/:id", facturas.delete);
  
    // Crear una nueva factura
    router.delete("/facturas", facturas.deleteAll);
  
    app.use('/libreria', router);
};