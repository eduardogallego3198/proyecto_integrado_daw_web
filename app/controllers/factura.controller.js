const db = require("../models");
const Factura = db.facturas;
const Op = db.Sequelize.Op;

// Crear y guardar una nueva factura
exports.create = (req, res) => {
    // Validar la solicitud
    var campoVacio = 
        (!req.body.id_pedido) ? "id_pedido" : 
        (!req.body.fecha) ? "fecha" : 
        (!req.body.metodo_pago) ? "metodo_pago" : null;
    
    if (campoVacio != null) {
        res.status(400).send({
            message: `El campo ${campoVacio} no puede estar vacío`
        });
        return;
    }

    // Crear una factura
    const factura = {
        id: req.body.id,
        id_pedido: req.body.id_pedido,
        fecha: req.body.fecha,
        metodo_pago: req.body.metodo_pago
    };

    // Guardar la factura en la base de datos
    Factura.create(factura).then(data => { 
        res.send(data); 
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha ocurrido un error al crear la factura."
        });
    });
};

// Obtener todas las facturas de la base de datos
exports.findAll = (req, res) => {
    const id_pedido = req.query.id_pedido;
    const fecha = req.query.fecha;
    const metodo_pago = req.query.metodo_pago;

    var condicion = 
        (id_pedido) ? { id_pedido: { [Op.like]: `%${id_pedido}%` } } :
        (fecha) ? { fecha: { [Op.like]: `%${fecha}%` } } :
        (metodo_pago) ? { metodo_pago: { [Op.like]: `%${metodo_pago}%` } } : null;

    Factura.findAll({ where: condicion }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha ocurrido un error al obtener las facturas"
        });
    });
};

// Encontrar una factura con su id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Factura.findByPk(id).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al obtener la factura con id=" + id
        });
    });
};

// Modificar una factura por su id
exports.update = (req, res) => {
    const id = req.params.id;

    Factura.update(req.body, { where: { id: id } }).then(num => {
        if (num == 1) {
            res.send({
                message: "Factura modificada correctamente"
            });
        } else {
            res.send({
                message: `No se puede modificar la factura con id=${id}. 
                    No se pudo encontrar la factura or req.body esta vacío`
            });
        } 
    }).catch(err => { 
        res.status(500).send({
            message: "Ha ocurrido un error al modificar la factura con id=" + id
        });
    });
};

// Borrar una factura por su id
exports.delete = (req, res) => {
    const id = req.params.id;

    Factura.destroy({ where: { id: id } }).then(num => {
        if (num == 1) {
            res.send({
                message: "La factura se ha borrado correctamente"
            });
        } else {
            res.send({
                message: `No se puede borrar la factura con id=${id}. 
                    No se pudo encontrar la factura`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Ha ocurrido un error al borrar la factura con id=" + id
        });
    });
};

// Borrar todas las facturas
exports.deleteAll = (req, res) => {
    Factura.destroy({ where: {}, truncate: false }).then(nums => {
          res.send({ message: `${nums} facturas se han borrado correctamente` });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha ocurrido un error al borrar las facturas"
        });
    });
};