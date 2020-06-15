const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Cliente = db.clientes;
const Encargado = db.encargados;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No se ha facilitado token"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "No autorizado!"
            });
        }
        req.id = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    if (Cliente.findByPk(req.id).rol == 'cliente') {
        res.status(403).send({
            message: "Se requiere rol administrador!"
        });
    }
    if (Encargado.findByPk(req.id).rol == 'admin') {
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
                next();
                return;
            }
        }
    }
    return;
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
};
module.exports = authJwt;