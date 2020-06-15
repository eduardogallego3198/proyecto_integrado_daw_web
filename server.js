const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const path = require('path')
const Cliente = require('./app/models/cliente.model');
const Encargado = require('./app/models/encargado.model');
const ghpages = require('gh-pages');

ghpages.publish('dist', {
    branch: 'master',
    repo: 'https://github.com/eduardogallego3198/proyecto_integrado_daw_web'
  }, function(err) {});

require("dotenv").config({
    path: path.join(__dirname, "../.env")
});

const app = express();
var corsOptions = { origin: "http://localhost:4200" };

app.use(express.static(__dirname + '/dist/libreria'));

app.use(cors(corsOptions));

// análisis de peticiones de la aplicación JSON
app.use(bodyParser.json());

// análisis de peticiones de la codificación de la URL
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
    if (req.headers["x-access-token"]) {
        const accessToken = req.headers["x-access-token"];
        const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
        // Check if token has expired
        if (exp < Date.now().valueOf() / 1000) {
            return res.status(401).json({ error: "El token JWT ha expirado, por favor, logueate para obtener uno nuevo" });
        }
        res.locals.loggedInUser = await Cliente.findById(userId); next();
        res.locals.loggedInUser = await Encargado.findById(userId); next();
    } else {
        next();
    }
});

app.use((req, res, next) => {
    if (req.headers["x-access-token"]) {
        const accessToken = req.headers["x-access-token"];
        const { userId, exp } = jwt.verify(accessToken, process.env.JWT_SECRET);
        // Check if token has expired
        if (exp < Date.now().valueOf() / 1000) {
            return res.status(401).json({ error: "El token JWT ha expirado, por favor, logueate para obtener uno nuevo" });
        }
        res.locals.loggedInUser = Encargado.findById(userId); next();
    } else {
        next();
    }
});


// const routes = require('./app/routes')(app);
// app.use('/', routes); 

const db = require("./app/models");

db.sequelize.sync();

require("./app/routes/albaran.routes")(app);
require("./app/routes/cliente.routes")(app);
require("./app/routes/consulta.routes")(app);
require("./app/routes/devolucion.routes")(app);
require("./app/routes/encargado.routes")(app);
require("./app/routes/factura.routes")(app);
require("./app/routes/libro.routes")(app);
require("./app/routes/linea_devolucion.routes")(app);
require("./app/routes/linea_pedido_proveedor.routes")(app);
require("./app/routes/linea_pedido.routes")(app);
require("./app/routes/pedido.routes")(app);
require("./app/routes/pedido_proveedor.routes")(app);
require("./app/routes/respuesta.routes")(app);

// establecer puerto y habilitar escucha de peticiones
const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}.`);
});