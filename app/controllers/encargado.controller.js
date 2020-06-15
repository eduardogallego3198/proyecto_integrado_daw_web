const db = require("../models");
const Encargado = db.encargados;
const Op = db.Sequelize.Op;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };

exports.login = (req, res) => {
    Encargado.findOne({
        where: {
            username: req.body.nombre_usuario
        }
    })
        .then(encargado => {
            if (!encargado) {
                return res.status(404).send({ message: "Cliente no encontrado." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                encargado.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Contraseña incorrecta"
                });
            }

            var token = jwt.sign({ id: encargado.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            var authorities = [];
            authorities.push("cliente");
            res.status(200).send({
                id: encargado.id,
                nombre_usuario: encargado.nombre_usuario,
                rol: authorities,
                token: token
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

// Crear y guardar un nuevo encargado
exports.create = (req, res) => {
    // Validar la solicitud
    var campoVacio =
        (!req.body.nombre) ? "nombre" :
            (!req.body.apellidos) ? "apellidos" :
                (!req.body.nombre_usuario) ? "nombre_usuario" :
                    (!req.body.password) ? "password" : null;

    if (campoVacio != null) {
        res.status(400).send({
            message: `El campo ${campoVacio} no puede estar vacío`
        });
        return;
    }

    const encargado = {
        id: req.body.id,
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        nombre_usuario: req.body.nombre_usuario,
        password: bcrypt.hashSync(req.body.password, 8),
        rol: 'admin',
        token: null
    };

    // Guardar el encargado en la base de datos
    Encargado.create(encargado).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha ocurrido un error al crear el encargado."
        });
    });
};

// Obtener todos los encargados de la base de datos
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    const apellidos = req.query.apellidos;
    const nombre_usuario = req.query.nombre_usuario;

    var condicion =
        (nombre) ? { nombre: { [Op.like]: `%${nombre}%` } } :
            (apellidos) ? { apellidos: { [Op.like]: `%${apellidos}%` } } :
                (nombre_usuario) ? { nombre_usuario: { [Op.like]: `%${nombre_usuario}%` } } : null;

    Encargado.findAll({ where: condicion }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha ocurrido un error al obtener los encargados"
        });
    });
};

// Encontrar un encargado con su id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Encargado.findByPk(id).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: "Error al obtener el encargado con id=" + id
        });
    });
};

// Modificar un encargado por su id
exports.update = (req, res) => {
    const id = req.params.id;

    Encargado.update(req.body, { where: { id: id } }).then(num => {
        if (num == 1) {
            res.send({
                message: "Encargado modificado correctamente"
            });
        } else {
            res.send({
                message: `No se puede modificar el encargado con id=${id}. 
                    No se pudo encontrar el encargado or req.body esta vacío`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Ha ocurrido un error al modificar el encargado con id=" + id
        });
    });
};

// Borrar un encargado por su id
exports.delete = (req, res) => {
    const id = req.params.id;

    Encargado.destroy({ where: { id: id } }).then(num => {
        if (num == 1) {
            res.send({
                message: "El encargado se ha borrado correctamente"
            });
        } else {
            res.send({
                message: `No se puede borrar el encargado con id=${id}. 
                    No se pudo encontrar el encargado`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Ha ocurrido un error al borrar el encargado con id=" + id
        });
    });
};

// Borrar todos los encargados
exports.deleteAll = (req, res) => {
    Encargado.destroy({ where: {}, truncate: false }).then(nums => {
        res.send({ message: `${nums} encargados se han borrado correctamente` });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Ha ocurrido un error al borrar los encargados"
        });
    });
};