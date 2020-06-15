module.exports = app => {
    const libros = require("../controllers/libro.controller");
  
    var router = require("express").Router();
  
    // Crear un nuevo libro
    router.post("/libros", libros.create);
  
    // Obtener todos los libros
    router.get("/libros", libros.findAll);
  
    // Obtener un libro por su id
    router.get("/libros/:id", libros.findOne);
  
    // Modificar un libro por su id
    router.put("/libros/:id", libros.update);
  
    // Borrar un libro por su id
    router.delete("/libros/:id", libros.delete);
  
    // Crear un nuevo libro
    router.delete("/libros", libros.deleteAll);
  
    app.use('/libreria', router);
};