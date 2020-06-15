module.exports = app => {
    const albaranes = require("../controllers/albaran.controller");
  
    var router = require("express").Router();
  
    // Crear un nuevo albarán
    router.post("/albaranes", albaranes.create);
  
    // Obtener todos los albaranes
    router.get("/albaranes", albaranes.findAll);
  
    // Obtener un albarán por su id
    router.get("/albaranes/:id", albaranes.findOne);
  
    // Modificar un albarán por su id
    router.put("/albaranes/:id", albaranes.update);
  
    // Borrar un albarán por su id
    router.delete("/albaranes/:id", albaranes.delete);
  
    // Crear un nuevo albarán
    router.delete("/albaranes", albaranes.deleteAll);
  
    app.use('/libreria', router);
};