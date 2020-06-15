const db = require("../models");
const Linea_pedido_proveedor = db.lineas_pedidos_proveedores;
const Op = db.Sequelize.Op;

// Crear y guardar una nueva línea_pedido_proveedor
exports.create = (req, res) => {
    // Validar la solicitud
    var campoVacio =
        (!req.body.id_pedido_proveedor) ? "id_pedido_proveedor" : 
        (!req.body.id_libro) ? "id_libro" : 
        (!req.body.cantidad) ? "cantidad" :
        (!req.body.total_linea) ? "total_linea" : null;
    
    if (campoVacio != null) {
        res.status(400).send({
            message: `El campo ${campoVacio} no puede estar vacío`
        });
        return;
    }

    // Crear una línea_pedido_proveedor
    const linea_pedido_proveedor = {
        id: req.body.id,
        id_pedido_proveedor: req.body.id_pedido_proveedor,
        id_libro: req.body.id_libro,
        cantidad: req.body.cantidad,
        total_linea: req.body.total_linea
    };

    // Guardar la línea_pedido_proveedor en la base de datos
    Linea_pedido_proveedor.create(linea_pedido_proveedor).then(data => { 
        res.send(data); 
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha ocurrido un error al crear la línea_pedido_proveedor."
        });
    });
};

// Obtener todas las lineas_pedido_proveedor de la base de datos
exports.findAll = (req, res) => {
    const id_pedido_proveedor = req.query.id_pedido_proveedor;
    const id_libro = req.query.id_libro;
    const cantidad = req.query.cantidad;
    const total_linea = req.query.total_linea;

    var condicion = 
        (id_pedido_proveedor) ? { id_pedido_proveedor: { [Op.like]: `%${id_pedido_proveedor}%` } } :
        (id_libro) ? { id_libro: { [Op.like]: `%${id_libro}%` } } :
        (cantidad) ? { cantidad: { [Op.like]: `%${cantidad}%` } } :
        (total_linea) ? { total_linea: { [Op.like]: `%${total_linea}%` } } : null;

    Linea_pedido_proveedor.findAll({ where: condicion }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha ocurrido un error al obtener las lineas_pedido_provedor"
        });
    });
};

// Encontrar una línea_pedido_proveedor con su id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Linea_pedido_proveedor.findByPk(id).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al obtener la línea_pedido_proveedor con id=" + id
        });
    });
};

// Modificar una línea_pedido_proveedor por su id
exports.update = (req, res) => {
    const id = req.params.id;

    Linea_pedido_proveedor.update(req.body, { where: { id: id } }).then(num => {
        if (num == 1) {
            res.send({
                message: "Línea_pedido_proveedor modificada correctamente"
            });
        } else {
            res.send({
                message: `No se puede modificar la línea_pedido_proveedor con id=${id}. 
                    No se pudo encontrar la línea_pedido_proveedor or req.body esta vacío`
            });
        } 
    }).catch(err => { 
        res.status(500).send({
            message: "Ha ocurrido un error al modificar la línea_pedido_proveedor con id=" + id
        });
    });
};

// Borrar una línea_pedido_proveedor por su id
exports.delete = (req, res) => {
    const id = req.params.id;

    Linea_pedido_proveedor.destroy({ where: { id: id } }).then(num => {
        if (num == 1) {
            res.send({
                message: "La línea_pedido_proveedor se ha borrado correctamente"
            });
        } else {
            res.send({
                message: `No se puede borrar la línea_pedido_proveedor con id=${id}. 
                    No se pudo encontrar la linea_pedido_proveedor`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Ha ocurrido un error al borrar la línea_pedido_proveedor con id=" + id
        });
    });
};

// Borrar todas las líneas_pedidos_provedores
exports.deleteAll = (req, res) => {
    Linea_pedido_proveedor.destroy({ where: {}, truncate: false }).then(nums => {
          res.send({ message: `${nums} líneas_pedidos_proveedores se han borrado correctamente` });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha ocurrido un error al borrar las líneas_pedidos_proveedores"
        });
    });
};