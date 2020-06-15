const db = require("../models");
const Albaran = db.albaranes;
const Op = db.Sequelize.Op;

// Crear y guardar un nuevo albarán
exports.create = (req, res) => {
    // Validar la solicitud
    var campoVacio = 
        (!req.body.id_pedido_proveedor) ? "id_pedido_proveedor" :
        (!req.body.fecha) ? "fecha" :
        (!req.body.metodo_pago) ? "metodo_pago" : null;

    if (campoVacio != null) {
        res.status(400).send({
            message: `El campo ${campoVacio} no puede estar vacío`
        });
        return;
    }
    
    // Crear un albarán
    const albaran = {
        id: req.body.id,
        id_pedido_proveedor: req.body.id_pedido_proveedor,
        fecha: req.body.fecha,
        metodo_pago: req.body.metodo_pago
    };
    
    // Guardar el albarán en la base de datos
    Albaran.create(albaran).then(data => { 
        res.send(data); 
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ha ocurrido un error al crear el albarán."
        });
    });
};

// Obtener todos los albaranes de la base de datos
exports.findAll = (req, res) => {
    const id_pedido_proveedor = req.query.id_pedido_proveedor;
    const fecha = req.query.fecha;
    const metodo_pago = req.query.metodo_pago;

    var condicion = 
        (id_pedido_proveedor) ? 
            { id_pedido_proveedor: { [Op.like]: `%${id_pedido_proveedor}%` } } : 
        (fecha) ? { fecha: { [Op.like]: `%${fecha}%` } } : 
        (metodo_pago) ? { metodo_pago: { [Op.like]: `%${metodo_pago}%` } } : null;
    
    Albaran.findAll({ where: condicion }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message 
                || "Ha ocurrido un error al obtener los albaranes"
        });
    });
};

// Encontrar un albarán con su id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Albaran.findByPk(id).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al obtener el albarán con id=" + id
        });
    });
};

// Modificar un albarán por su id
exports.update = (req, res) => {
    const id = req.params.id;

    Albaran.update(req.body, { where: { id: id } }).then(num => {
        if (num == 1) {
            res.send({
                message: "Albarán modificado correctamente"
            });
        } else {
            res.send({
                message: `No se puede modificar el albarán con id=${id}. 
                    No se pudo encontrar el albarán or req.body esta vacío`
            });
        } 
    }).catch(err => { 
        res.status(500).send({
            message: "Ha ocurrido un error al modificar el albarán con id=" + id
        });
    });
};

// Borrar un albarán por su id
exports.delete = (req, res) => {
    const id = req.params.id;

    Albaran.destroy({ where: { id: id } }).then(num => {
        if (num == 1) {
            res.send({
                message: "El albarán se ha borrado correctamente"
            });
        } else {
            res.send({
                message: `No se puede borrar el albarán con id=${id}. 
                    No se pudo encontrar el albarán`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Ha ocurrido un error al borrar el albarán con id=" + id
        });
    });
};

// Borrar todos los albaranes
exports.deleteAll = (req, res) => {
    Albaran.destroy({ where: {}, truncate: false }).then(nums => {
          res.send({ message: `${nums} albaranes se han borrado correctamente` });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha ocurrido un error al borrar los albaranes"
        });
    });
};