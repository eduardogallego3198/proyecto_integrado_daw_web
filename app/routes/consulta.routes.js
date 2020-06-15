module.exports = app => {
    const consultas = require("../controllers/consulta.controller");
  
    var router = require("express").Router();
  
    // Crear un nuevo consulta
    router.post("/consultas", consultas.create);
  
    // Obtener todas las consultas
    router.get("/consultas", consultas.findAll);
  
    // Obtener una consulta por su id
    router.get("/consultas/:id", consultas.findOne);
  
    // Modificar una consulta por su id
    router.put("/consultas/:id", consultas.update);
  
    // Borrar una consulta por su id
    router.delete("/consultas/:id", consultas.delete);
  
    // Crear una nueva consulta
    router.delete("/consultas", consultas.deleteAll);
  
    app.use('/libreria', router);
};