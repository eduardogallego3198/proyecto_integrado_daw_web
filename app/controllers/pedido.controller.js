const db = require("../models");
const Pedido = db.pedidos;
const Op = db.Sequelize.Op;

// Crear y guardar un nuevo pedido
exports.create = (req, res) => {
    // Validar la solicitud
    var campoVacio =
        (!req.body.fecha) ? "fecha" : 
        (!req.body.id_encargado) ? "id_encargado" :
        (!req.body.id_cliente) ? "id_cliente" : 
        (!req.body.pagado) ? "pagado" : 
        (!req.body.total) ? "total" : 
        (!req.body.estado) ? "estado" : null;
    
    if (campoVacio != null) {
        res.status(400).send({
            message: `El campo ${campoVacio} no puede estar vacío`
        });
        return;
    }

    // Crear un pedido
    const pedido = {
        id: req.body.id,
        fecha: req.body.fecha,
        id_encargado: req.body.id_encargado,
        id_cliente: req.body.id_cliente,
        pagado: req.body.pagado,
        total: req.body.total,
        estado: req.body.estado
    };

    // Guardar el pedido en la base de datos
    Pedido.create(pedido).then(data => { 
        res.send(data); 
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha ocurrido un error al crear el pedido."
        });
    });
};

// Obtener todas las pedidos de la base de datos
exports.findAll = (req, res) => {
    const fecha = req.query.fecha;
    const id_encargado = req.query.id_encargado;
    const id_cliente = req.query.id_cliente;
    const pagado = req.query.pagado;
    const total = req.query.total;
    const estado = req.query.estado;

    var condicion =
        (fecha) ? { fecha: { [Op.like]: `%${fecha}%` } } :
        (id_encargado) ? { id_encargado: { [Op.like]: `%${id_encargado}%` } } :
        (id_cliente) ? { id_cliente: { [Op.like]: `%${id_cliente}%` } } :
        (total) ? { total: { [Op.like]: `%${total}%` } } :
        (pagado) ? { pagado: { [Op.like]: `%${pagado}%` } } :
        (estado) ? { estado: { [Op.like]: `%${estado}%` } } : null;

    console.log(condicion);

    Pedido.findAll({ where: condicion }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha ocurrido un error al obtener las pedidos"
        });
    });
};

// Encontrar un pedido con su id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Pedido.findByPk(id).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al obtener el pedido con id=" + id
        });
    });
};

// Modificar un pedido por su id
exports.update = (req, res) => {
    const id = req.params.id;

    Pedido.update(req.body, { where: { id: id } }).then(num => {
        if (num == 1) {
            res.send({
                message: "Pedido modificado correctamente"
            });
        } else {
            res.send({
                message: `No se puede modificar el pedido con id=${id}. 
                    No se pudo encontrar el pedido or req.body esta vacío`
            });
        } 
    }).catch(err => { 
        res.status(500).send({
            message: "Ha ocurrido un error al modificar el pedido con id=" + id
        });
    });
};

// Borrar un pedido por su id
exports.delete = (req, res) => {
    const id = req.params.id;
    console.log(id);
    Pedido.destroy({ where: { id: id } }).then(num => {
        if (num == 1) {
            res.send({
                message: "El pedido se ha borrado correctamente"
            });
        } else {
            res.send({
                message: `No se puede borrar el pedido con id=${id}. 
                    No se pudo encontrar el pedido`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Ha ocurrido un error al borrar el pedido con id=" + id
        });
    });
};

// Borrar todas los pedidos
exports.deleteAll = (req, res) => {
    Pedido.destroy({ where: {}, truncate: false }).then(nums => {
          res.send({ message: `${nums} pedidos se han borrado correctamente` });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha ocurrido un error al borrar los pedidos"
        });
    });
};