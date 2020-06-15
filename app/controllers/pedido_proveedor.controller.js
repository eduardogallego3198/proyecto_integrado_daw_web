const db = require("../models");
const Pedido_proveedor = db.pedidos_proveedores;
const Op = db.Sequelize.Op;

// Crear y guardar un nuevo pedido_proveedor
exports.create = (req, res) => {
    // Validar la solicitud
    var campoVacio = 
        (!req.body.fecha) ? "fecha" : 
        (!req.body.proveedor) ? "proveedor" :
        (!req.body.id_encargado) ? "id_encargado" :  
        (!req.body.pagado) ? "pagado" : 
        (!req.body.total) ? "total" : null;
    
    if (campoVacio != null) {
        res.status(400).send({
            message: `El campo ${campoVacio} no puede estar vacío`
        });
        return;
    }

    // Crear un pedido_proveedor
    const pedido_proveedor = {
        id: req.body.id,
        fecha: req.body.fecha,
        proveedor: req.body.proveedor,
        id_encargado: req.body.id_encargado,
        pagado: req.body.pagado,
        total: req.body.total
    };

    // Guardar el pedido_proveedor en la base de datos
    Pedido_proveedor.create(pedido_proveedor).then(data => { 
        res.send(data); 
    }).catch(err => {
        res.status(500).send({
            message: err.message 
                || "Ha ocurrido un error al crear el pedido_proveedor."
        });
    });
};

// Obtener todos los pedido_proveedor de la base de datos
exports.findAll = (req, res) => {
    const fecha = req.query.fecha;
    const proveedor = req.query.proveedor;
    const id_encargado = req.query.id_encargado;
    const pagado = req.query.pagado;
    const total = req.query.total;

    var condicion =
        (fecha) ? { fecha: { [Op.like]: `%${fecha}%` } } :
        (proveedor) ? { proveedor: { [Op.like]: `%${proveedor}%` } } : 
        (id_encargado) ? { id_encargado: { [Op.like]: `%${id_encargado}%` } } :
        (pagado) ? { pagado: { [Op.like]: `%${pagado}%` } } :
        (total) ? { total: { [Op.like]: `%${total}%` } } : null;

    Pedido_proveedor.findAll({ where: condicion }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha ocurrido un error al obtener los pedido_proveedor"
        });
    });
};

// Encontrar un pedido_proveedor con su id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Pedido_proveedor.findByPk(id).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al obtener el pedido_proveedor con id=" + id
        });
    });
};

// Modificar un pedido_proveedor por su id
exports.update = (req, res) => {
    const id = req.params.id;

    Pedido_proveedor.update(req.body, { where: { id: id } }).then(num => {
        if (num == 1) {
            res.send({
                message: "Pedido_proveedor modificado correctamente"
            });
        } else {
            res.send({
                message: `No se puede modificar el pedido_proveedor con id=${id}. 
                    No se pudo encontrar el pedido_proveedor or req.body esta vacío`
            });
        } 
    }).catch(err => { 
        res.status(500).send({
            message: "Ha ocurrido un error al modificar el pedido_proveedor con id=" + id
        });
    });
};

// Borrar un pedido_proveedor por su id
exports.delete = (req, res) => {
    const id = req.params.id;

    Pedido_proveedor.destroy({ where: { id: id } }).then(num => {
        if (num == 1) {
            res.send({
                message: "El pedido_proveedor se ha borrado correctamente"
            });
        } else {
            res.send({
                message: `No se puede borrar el pedido_proveedor con id=${id}. 
                    No se pudo encontrar el pedido_proveedor`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Ha ocurrido un error al borrar el pedido_proveedor con id=" + id
        });
    });
};

// Borrar todos los pedido_proveedor
exports.deleteAll = (req, res) => {
    Pedido_proveedor.destroy({ where: {}, truncate: false }).then(nums => {
          res.send({ message: `${nums} pedido_proveedor se han borrado correctamente` });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha ocurrido un error al borrar los pedido_proveedor"
        });
    });
};