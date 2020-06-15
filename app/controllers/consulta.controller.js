const db = require("../models");
const Consulta = db.consultas;
const Op = db.Sequelize.Op;

// Crear y guardar una nueva consulta
exports.create = (req, res) => {
    // Validar la solicitud
    var campoVacio = 
        (!req.body.id_cliente) ? "id_cliente" : 
        (!req.body.asunto) ? "asunto" : 
        (!req.body.mensaje) ? "mensaje" : null;
    
    if (campoVacio != null) {
        res.status(400).send({
            message: `El campo ${campoVacio} no puede estar vacío`
        });
        return;
    }

    // Crear una consulta
    const consulta = {
        id: req.body.id,
        id_cliente: req.body.id_cliente,
        asunto: req.body.asunto,
        mensaje: req.body.mensaje
    };

    // Guardar la consulta en la base de datos
    Consulta.create(consulta).then(data => { 
        res.send(data); 
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha ocurrido un error al crear la consulta."
        });
    });
};

// Obtener todas las consultas de la base de datos
exports.findAll = (req, res) => {
    const id_cliente = req.query.id_cliente;
    const asunto = req.query.asunto;
    const mensaje = req.query.mensaje;

    var condicion =  
        (id_cliente) ? { id_cliente: { [Op.like]: `%${id_cliente}%` } } :
        (asunto) ? { asunto: { [Op.like]: `%${asunto}%` } } :
        (mensaje) ? { mensaje: { [Op.like]: `%${mensaje}%` } } : null;

    Consulta.findAll({ where: condicion }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha ocurrido un error al obtener las consultas"
        });
    });
};

// Encontrar una consulta con su id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Consulta.findByPk(id).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al obtener la consulta con id=" + id
        });
    });
};

// Modificar una consulta por su id
exports.update = (req, res) => {
    const id = req.params.id;

    Consulta.update(req.body, { where: { id: id } }).then(num => {
        if (num == 1) {
            res.send({
                message: "Consulta modificada correctamente"
            });
        } else {
            res.send({
                message: `No se puede modificar la consulta con id=${id}. 
                    No se pudo encontrar la consulta or req.body esta vacío`
            });
        } 
    }).catch(err => { 
        res.status(500).send({
            message: "Ha ocurrido un error al modificar la consulta con id=" + id
        });
    });
};

// Borrar una consulta por su id
exports.delete = (req, res) => {
    const id = req.params.id;

    Consulta.destroy({ where: { id: id } }).then(num => {
        if (num == 1) {
            res.send({
                message: "La consulta se ha borrado correctamente"
            });
        } else {
            res.send({
                message: `No se puede borrar la consulta con id=${id}. 
                    No se pudo encontrar la consulta`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Ha ocurrido un error al borrar la consulta con id=" + id
        });
    });
};

// Borrar todas las consultas
exports.deleteAll = (req, res) => {
    Consulta.destroy({ where: {}, truncate: false }).then(nums => {
          res.send({ message: `${nums} consultas se han borrado correctamente` });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha ocurrido un error al borrar las consultas"
        });
    });
};