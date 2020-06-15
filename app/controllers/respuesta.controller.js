const db = require("../models");
const Respuesta = db.respuestas;
const Op = db.Sequelize.Op;

// Crear y guardar una nueva respuesta
exports.create = (req, res) => {
    // Validar la solicitud
    var campoVacio =
        (!req.body.id_consulta) ? "id_consulta" : 
        (!req.body.mensaje) ? "mensaje" : null;
    
    if (campoVacio != null) {
        res.status(400).send({
            message: `El campo ${campoVacio} no puede estar vacío`
        });
        return;
    }

    // Crear una respuesta
    const respuesta = {
        id: req.body.id,
        id_consulta: req.body.id_consulta,
        mensaje: req.body.mensaje
    };

    // Guardar la respuesta en la base de datos
    Respuesta.create(respuesta).then(data => { 
        res.send(data); 
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha ocurrido un error al crear la respuesta."
        });
    });
};

// Obtener todas las respuestas de la base de datos
exports.findAll = (req, res) => {
    const id_consulta = req.query.id_consulta;
    const mensaje = req.query.mensaje;

    var condicion =
        (id_consulta) ? { id_consulta: { [Op.like]: `%${id_consulta}%` } } :
        (mensaje) ? { mensaje: { [Op.like]: `%${mensaje}%` } } : null;

    Respuesta.findAll({ where: condicion }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha ocurrido un error al obtener las respuestas"
        });
    });
};

// Encontrar una respuesta con su id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Respuesta.findByPk(id).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al obtener la respuesta con id=" + id
        });
    });
};

// Modificar una respuesta por su id
exports.update = (req, res) => {
    const id = req.params.id;

    Respuesta.update(req.body, { where: { id: id } }).then(num => {
        if (num == 1) {
            res.send({
                message: "Respuesta modificada correctamente"
            });
        } else {
            res.send({
                message: `No se puede modificar la respuesta con id=${id}. 
                    No se pudo encontrar la respuesta or req.body esta vacío`
            });
        } 
    }).catch(err => { 
        res.status(500).send({
            message: "Ha ocurrido un error al modificar la respuesta con id=" + id
        });
    });
};

// Borrar una respuesta por su id
exports.delete = (req, res) => {
    const id = req.params.id;

    Respuesta.destroy({ where: { id: id } }).then(num => {
        if (num == 1) {
            res.send({
                message: "La respuesta se ha borrado correctamente"
            });
        } else {
            res.send({
                message: `No se puede borrar la respuesta con id=${id}. 
                    No se pudo encontrar la pedido`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Ha ocurrido un error al borrar la respuesta con id=" + id
        });
    });
};

// Borrar todas las pedidos
exports.deleteAll = (req, res) => {
    Pedido.destroy({ where: {}, truncate: false }).then(nums => {
          res.send({ message: `${nums} respuesta se han borrado correctamente` });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha ocurrido un error al borrar las respuestas"
        });
    });
};