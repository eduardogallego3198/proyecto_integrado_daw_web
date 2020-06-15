const db = require("../models");
const ROLES = db.ROLES;
const Cliente = db.clientes;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  Cliente.findOne({
    where: {
      nombre_usuario: req.body.nombre_usuario
    }
  }).then(cliente => {
    if (cliente) {
      res.status(400).send({
        message: "El nombre de usuario ya existe"
      });
      return;
    }

    // Email
    Cliente.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "El correo electrónico ya existe"
        });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "El rol no existe = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;