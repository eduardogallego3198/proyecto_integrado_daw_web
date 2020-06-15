
module.exports = app => {
    const { authJwt } = require("../middlewares");
    const { verifySignUp } = require("../middlewares");

    const clientes = require("../controllers/cliente.controller");

    const router = require("express").Router();

    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.post("/registro", [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
    ], clientes.create);

    router.post('/login', clientes.login);

    app.get("/public", clientes.allAccess);

    app.get(
        "/cliente",
        [authJwt.verifyToken],
        clientes.userBoard
      );
    
    router.get("/clientes/:id", clientes.findOne);

    router.put("/clientes/:id", clientes.update);

    router.delete("/clientes/:id", clientes.delete);

    router.delete("/clientes", clientes.deleteAll);

    app.use('/libreria', router);
};