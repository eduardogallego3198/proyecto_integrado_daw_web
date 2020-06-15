module.exports = app => {
    const lineas_devoluciones = require("../controllers/linea_devolucion.controller");
  
    var router = require("express").Router();
  
    // Crear una nueva linea_devolucion
    router.post("/lineas_devoluciones", lineas_devoluciones.create);
  
    // Obtener todas las lineas_devoluciones
    router.get("/lineas_devoluciones", lineas_devoluciones.findAll);
  
    // Obtener una linea_devolucion por su id
    router.get("/lineas_devoluciones/:id", lineas_devoluciones.findOne);
  
    // Modificar una linea_devolucion por su id
    router.put("/lineas_devoluciones/:id", lineas_devoluciones.update);
  
    // Borrar una linea_devolucion por su id
    router.delete("/lineas_devoluciones/:id", lineas_devoluciones.delete);
  
    // Crear una nueva linea_devolucion
    router.delete("/lineas_devoluciones", lineas_devoluciones.deleteAll);
  
    app.use('/libreria', router);
};