module.exports = app => {
    const { authJwt } = require("../middlewares");
    const encargados = require("../controllers/encargado.controller");

    var router = require("express").Router();

    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.post("/encargados", encargados.create);

    router.get('/adminLogin', encargados.login);

    app.get("/public", encargados.allAccess);

    app.get(
        "/admin",
        [authJwt.verifyToken],
        encargados.adminBoard
      );
    
    router.get("/encargados", encargados.findAll);

    router.get("/encargados/:id", encargados.findOne);
    
    router.put("/encargados/:id", encargados.update);
    
    router.delete("/encargados/:id", encargados.delete);

    router.delete("/encargados", encargados.deleteAll);

    app.use('/libreria', router);
};