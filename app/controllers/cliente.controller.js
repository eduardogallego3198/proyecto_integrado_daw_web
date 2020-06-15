const db = require("../models");
const config = require("../config/auth.config");
const Cliente = db.clientes;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Op = db.Sequelize.Op;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };

exports.login = (req, res) => {
    Cliente.findOne({
        where: {
            nombre_usuario: req.body.nombre_usuario
        }
    })
        .then(cliente => {
            if (!cliente) {
                res.status(404).send({ message: "Cliente no encontrado." });
                return;
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                cliente.password
            );

            if (!passwordIsValid) {
                res.status(401).send({
                    token: null,
                    message: "Contraseña incorrecta"
                });
            }

            var token = jwt.sign({ id: cliente.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            var authorities = [];
            authorities.push("cliente");

            
            res.status(200).send({
                id: cliente.id,
                nombre_usuario: cliente.nombre_usuario,
                rol: authorities,
                token: token
            });
            
            Cliente.update({token: token}, { where: { id: cliente.id } });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

// Crear y guardar un nuevo cliente
exports.create = (req, res) => {
    // Validar la solicitud
    var campoVacio =
        (!req.body.nombre) ? "nombre" :
            (!req.body.apellidos) ? "apellidos" :
                (!req.body.direccion) ? "direccion" :
                    (!req.body.dni) ? "dni" :
                        (!req.body.telefono) ? "telefono" :
                            (!req.body.email) ? "email" :
                                (!req.body.nombre_usuario) ? "nombre_usuario" :
                                    (!req.body.password) ? "password" : null;

    if (campoVacio != null) {
        res.status(400).send({
            message: `El campo ${campoVacio} no puede estar vacío`
        });
        return;
    } else {
        // Crear un cliente
        const cliente = {
            id: null,
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            direccion: req.body.direccion,
            dni: req.body.dni,
            telefono: req.body.telefono,
            email: req.body.email,
            nombre_usuario: req.body.nombre_usuario,
            password: bcrypt.hashSync(req.body.password, 8),
            rol: 'cliente',
            token: null
        };

        // Guardar el cliente en la base de datos
        Cliente.create(cliente).then(data => {
            res.send(data)
            res.send({ message: "El cliente " + cliente.nombre_usuario + " se ha registrado correctamente" })
        }).catch(err => {
            res.status(500).json({
                message:
                    err.message || "Ha ocurrido un error al crear el cliente."
            });
        });
    }

};

// Obtener todos los clientes de la base de datos
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    const apellidos = req.query.apellidos;
    const direccion = req.query.direccion;
    const dni = req.query.dni;
    const telefono = req.query.telefono;
    const email = req.query.email;
    const nombre_usuario = req.query.nombre_usuario;

    var condicion =
        (nombre) ? { nombre: { [Op.like]: `%${nombre}%` } } :
            (apellidos) ? { apellidos: { [Op.like]: `%${apellidos}%` } } :
                (direccion) ? { direccion: { [Op.like]: `%${direccion}%` } } :
                    (dni) ? { dni: { [Op.like]: `%${dni}%` } } :
                        (direccion) ? { direccion: { [Op.like]: `%${direccion}%` } } :
                            (telefono) ? { telefono: { [Op.like]: `%${telefono}%` } } :
                                (email) ? { email: { [Op.like]: `%${email}%` } } :
                                    (nombre_usuario) ? { nombre_usuario: { [Op.like]: `%${nombre_usuario}%` } } : null;

    Cliente.findAll({ where: condicion }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha ocurrido un error al obtener los clientes"
        });
    });
}

// Encontrar un cliente con su id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Cliente.findByPk(id).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al obtener el cliente con id=" + id
        });
    });
}

// Modificar un cliente por su id
exports.update = (req, res) => {
    const id = req.params.id;

    Cliente.update(req.body, { where: { id: id } }).then(num => {
        if (num == 1) {
            res.send({
                message: "Cliente modificado correctamente"
            });
        } else {
            res.send({
                message: `No se puede modificar el cliente con id=${id}. 
                    No se pudo encontrar el cliente or req.body esta vacío`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Ha ocurrido un error al modificar el cliente con id=" + id
        });
    });
}

// Borrar un cliente por su id
exports.delete = (req, res) => {
    const id = req.params.id;

    Albaran.destroy({ where: { id: id } }).then(num => {
        if (num == 1) {
            res.send({
                message: "El cliente se ha borrado correctamente"
            });
        } else {
            res.send({
                message: `No se puede borrar el cliente con id=${id}. 
                    No se pudo encontrar el cliente`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Ha ocurrido un error al borrar el cliente con id=" + id
        });
    });
}

// Borrar todos los clientes
exports.deleteAll = (req, res) => {
    Cliente.destroy({ where: {}, truncate: false }).then(nums => {
        res.send({ message: `${nums} clientes se han borrado correctamente` });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha ocurrido un error al borrar los clientes"
        });
    });
}