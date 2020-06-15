const db = require("../models");
const Linea_devolucion = db.lineas_devoluciones;
const Op = db.Sequelize.Op;

// Crear y guardar una nueva línea_devolución
exports.create = (req, res) => {
    // Validar la solicitud
    var campoVacio = 
        (!req.body.id_devolucion) ? "id_devolucion" : 
        (!req.body.id_libro) ? "id_libro" : 
        (!req.body.cantidad) ? "cantidad" :
        (!req.body.total_linea) ? "total_linea" : null;
    
    if (campoVacio != null) {
        res.status(400).send({
            message: `El campo ${campoVacio} no puede estar vacío`
        });
        return;
    }

    // Crear una línea_devolución
    const linea_devolucion = {
        id: req.body.id,
        id_devolucion: req.body.id_devolucion,
        id_libro: req.body.id_libro,
        cantidad: req.body.cantidad,
        total_linea: req.body.total_linea
    };

    // Guardar la línea_devolución en la base de datos
    Linea_devolucion.create(linea_devolucion).then(data => { 
        res.send(data); 
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha ocurrido un error al crear la línea_devolución."
        });
    });
};

// Obtener todas las linea_devolucion de la base de datos
exports.findAll = (req, res) => {
    const id_devolucion = req.query.id_devolucion;
    const id_libro = req.query.id_libro;
    const cantidad = req.query.cantidad;
    const total_linea = req.query.total_linea;

    var condicion =
        (id_devolucion) ? { id_devolucion: { [Op.like]: `%${id_devolucion}%` } } :
        (id_libro) ? { id_libro: { [Op.like]: `%${id_libro}%` } } :
        (cantidad) ? { cantidad: { [Op.like]: `%${cantidad}%` } } :
        (total_linea) ? { total_linea: { [Op.like]: `%${total_linea}%` } } : null;

    Linea_devolucion.findAll({ where: condicion }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha ocurrido un error al obtener las linea_devolucion"
        });
    });
};

// Encontrar una línea_devolución con su id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Linea_devolucion.findByPk(id).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al obtener la línea_devolución con id=" + id
        });
    });
};

// Modificar una línea_devolución por su id
exports.update = (req, res) => {
    const id = req.params.id;

    Linea_devolucion.update(req.body, { where: { id: id } }).then(num => {
        if (num == 1) {
            res.send({
                message: "Línea_devolución modificada correctamente"
            });
        } else {
            res.send({
                message: `No se puede modificar la línea_devolución con id=${id}. 
                    No se pudo encontrar la línea_devoluciñon or req.body esta vacío`
            });
        } 
    }).catch(err => { 
        res.status(500).send({
            message: "Ha ocurrido un error al modificar la línea_devolución con id=" + id
        });
    });
};

// Borrar una línea_devolucion por su id
exports.delete = (req, res) => {
    const id = req.params.id;

    Linea_devolucion.destroy({ where: { id: id } }).then(num => {
        if (num == 1) {
            res.send({
                message: "La línea_devolucion se ha borrado correctamente"
            });
        } else {
            res.send({
                message: `No se puede borrar la línea_devolucion con id=${id}. 
                    No se pudo encontrar la línea_devolucion`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Ha ocurrido un error al borrar la línea_devolucion con id=" + id
        });
    });
};

// Borrar todas las líneas_devoluciones
exports.deleteAll = (req, res) => {
    Linea_devolucion.destroy({ where: {}, truncate: false }).then(nums => {
          res.send({ message: `${nums} líneas_devoluciones se han borrado correctamente` });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha ocurrido un error al borrar las líneas_devoluciones"
        });
    });
};