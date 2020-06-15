const db = require("../models");
const Devolucion = db.devoluciones;
const Op = db.Sequelize.Op;

// Crear y guardar una nueva devolución
exports.create = (req, res) => {
    // Validar la solicitud
    var campoVacio =
        (!req.body.fecha) ? "fecha" : 
        (!req.body.id_cliente) ? "id_cliente" : 
        (!req.body.total) ? "total" : 
        (!req.body.estado) ? "estado" : null;
    
    if (campoVacio != null) {
        res.status(400).send({
            message: `El campo ${campoVacio} no puede estar vacío`
        });
        return;
    }

    // Crear una devolución
    const devolucion = {
        id: req.body.id,
        fecha: req.body.fecha,
        id_cliente: req.body.id_cliente,
        total: req.body.total,
        estado: req.body.estado
    };

    // Guardar la devolución en la base de datos
    Devolucion.create(devolucion).then(data => { 
        res.send(data); 
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha ocurrido un error al crear la devolución."
        });
    });
};

// Obtener todas las devoluciones de la base de datos
exports.findAll = (req, res) => {
    const fecha = req.query.fecha;
    const id_cliente = req.query.id_cliente;
    const total = req.query.total;
    const estado = req.query.estado
    
    var condicion = 
        (fecha) ? { fecha: { [Op.like]: `%${fecha}%` } } :
        (id_cliente) ? { id_cliente: { [Op.like]: `%${id_cliente}%` } } :
        (total) ? { total: { [Op.like]: `%${total}%` } } : 
        (estado) ? { estado: { [Op.like]: `%${estado}%` } } : null;

    Devolucion.findAll({ where: condicion }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha ocurrido un error al obtener las devoluciones"
        });
    });
};

// Encontrar una devolución con su id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Devolucion.findByPk(id).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al obtener la devolución con id=" + id
        });
    });
};

// Modificar una devolución por su id
exports.update = (req, res) => {
    const id = req.params.id;

    Devolucion.update(req.body, { where: { id: id } }).then(num => {
        if (num == 1) {
            res.send({
                message: "Devolución modificada correctamente"
            });
        } else {
            res.send({
                message: `No se puede modificar la devolución con id=${id}. 
                    No se pudo encontrar la devolución or req.body esta vacío`
            });
        } 
    }).catch(err => { 
        res.status(500).send({
            message: "Ha ocurrido un error al modificar la devolución con id=" + id
        });
    });
};

// Borrar una devolucion por su id
exports.delete = (req, res) => {
    const id = req.params.id;

    Devolucion.destroy({ where: { id: id } }).then(num => {
        if (num == 1) {
            res.send({
                message: "La devolucion se ha borrado correctamente"
            });
        } else {
            res.send({
                message: `No se puede borrar la devolucion con id=${id}. 
                    No se pudo encontrar la devolucion`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Ha ocurrido un error al borrar la devolucion con id=" + id
        });
    });
};

// Borrar todas las devoluciones
exports.deleteAll = (req, res) => {
    Devolucion.destroy({ where: {}, truncate: false }).then(nums => {
          res.send({ message: `${nums} devoluciones se han borrado correctamente` });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha ocurrido un error al borrar las devoluciones"
        });
    });
};