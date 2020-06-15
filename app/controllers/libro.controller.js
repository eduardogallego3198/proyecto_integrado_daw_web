const db = require("../models");
const Libro = db.libros;
const Op = db.Sequelize.Op;

// Crear y guardar un nuevo libro
exports.create = (req, res) => {
    // Validar la solicitud
    var campoVacio = 
        (!req.body.titulo) ? "titulo" : 
        (!req.body.autor) ? "autor" :
        (!req.body.editorial) ? "editorial" :  
        (!req.body.genero) ? "genero" : 
        (!req.body.ano_publicacion) ? "ano_publicacion" :
        (!req.body.paginas) ? "paginas" :
        (!req.body.descripcion) ? "descripcion" :
        (!req.body.stock) ? "stock" :
        (!req.body.precio) ? "precio" : null;
    
    if (campoVacio != null) {
        res.status(400).send({
            message: `El campo ${campoVacio} no puede estar vacío`
        });
        return;
    }

    // Crear un libro
    const libro = {
        id: req.body.id,
        titulo: req.body.titulo,
        autor: req.body.autor,
        editorial: req.body.editorial,
        genero: req.body.genero,
        ano_publicacion: req.body.ano_publicacion,
        paginas: req.body.paginas,
        descripcion: req.body.descripcion,
        stock: req.body.stock,
        precio: req.body.precio,
        url_imagen: req.body.url_imagen
    };

    // Guardar el libro en la base de datos
    Libro.create(libro).then(data => { 
        res.send(data); 
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha ocurrido un error al crear el libro."
        });
    });
};

// Obtener todos los libros de la base de datos
exports.findAll = (req, res) => {
    const titulo = req.query.titulo;
    const autor = req.query.autor;
    const editorial = req.query.editorial;
    const genero = req.query.genero;
    const ano_publicacion = req.query.ano_publicacion;
    const paginas = req.query.paginas;
    const descripcion = req.query.descripcion;
    const stock = req.query.stock;
    const precio = req.query.precio;
    const url_imagen = req.query.url_imagen;

    var condicion = 
        (titulo) ? { titulo: { [Op.like]: `%${titulo}%` } } :
        (autor) ? { autor: { [Op.like]: `%${autor}%` } } : 
        (editorial) ? { editorial: { [Op.like]: `%${editorial}%` } } :
        (genero) ? { genero: { [Op.like]: `%${genero}%` } } :
        (ano_publicacion) ? { ano_publicacion: { [Op.like]: `%${ano_publicacion}%` } } :
        (paginas) ? { paginas: { [Op.like]: `%${paginas}%` } } :
        (descripcion) ? { descripcion: { [Op.like]: `%${descripcion}%` } } :
        (stock) ? { stock: { [Op.like]: `%${stock}%` } } :
        (precio) ? { precio: { [Op.like]: `%${precio}%` } } : null;

    Libro.findAll({ where: condicion }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha ocurrido un error al obtener los libros"
        });
    });
};

// Encontrar un libro con su id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Libro.findByPk(id).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al obtener el libro con id=" + id
        });
    });
};

// Modificar un libro por su id
exports.update = (req, res) => {
    const id = req.params.id;

    Libro.update(req.body, { where: { id: id } }).then(num => {
        if (num == 1) {
            res.send({
                message: "Libro modificado correctamente"
            });
        } else {
            res.send({
                message: `No se puede modificar el libro con id=${id}. 
                    No se pudo encontrar el libro or req.body esta vacío`
            });
        } 
    }).catch(err => { 
        res.status(500).send({
            message: "Ha ocurrido un error al modificar el libro con id=" + id
        });
    });
};

// Borrar un libro por su id
exports.delete = (req, res) => {
    const id = req.params.id;

    Albaran.destroy({ where: { id: id } }).then(num => {
        if (num == 1) {
            res.send({
                message: "El libro se ha borrado correctamente"
            });
        } else {
            res.send({
                message: `No se puede borrar el libro con id=${id}. 
                    No se pudo encontrar el libro`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Ha ocurrido un error al borrar el libro con id=" + id
        });
    });
};

// Borrar todos los libros
exports.deleteAll = (req, res) => {
    Libro.destroy({ where: {}, truncate: false }).then(nums => {
          res.send({ message: `${nums} libros se han borrado correctamente` });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha ocurrido un error al borrar los libros"
        });
    });
};