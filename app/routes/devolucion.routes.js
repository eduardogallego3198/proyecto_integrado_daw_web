module.exports = app => {
    const devoluciones = require("../controllers/devolucion.controller");
  
    var router = require("express").Router();
  
    // Crear una nueva devolucion
    router.post("/devoluciones", devoluciones.create);
  
    // Obtener todas las devoluciones
    router.get("/devoluciones", devoluciones.findAll);
  
    // Obtener una devolucion por su id
    router.get("/devoluciones/:id", devoluciones.findOne);
  
    // Modificar una devolucion por su id
    router.put("/devoluciones/:id", devoluciones.update);
  
    // Borrar una devolucion por su id
    router.delete("/devoluciones/:id", devoluciones.delete);
  
    // Crear una nueva devolucion
    router.delete("/devoluciones/", devoluciones.deleteAll);
  
    app.use('/libreria', router);
};