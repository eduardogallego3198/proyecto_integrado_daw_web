const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    dbConfig.DB, 
    dbConfig.USER, 
    dbConfig.PASSWORD, 
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
);

const db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    albaranes: require("./albaran.model")(sequelize, Sequelize),
    clientes: require("./cliente.model")(sequelize, Sequelize),
    consultas: require("./consulta.model")(sequelize, Sequelize),
    devoluciones: require("./devolucion.model")(sequelize, Sequelize),
    encargados: require("./encargado.model")(sequelize, Sequelize),
    facturas: require("./factura.model")(sequelize, Sequelize),
    libros: require("./libro.model")(sequelize, Sequelize),
    lineas_devoluciones: require("./linea_devolucion.model")(sequelize, Sequelize),
    lineas_pedidos: require("./linea_pedido.model")(sequelize, Sequelize),
    lineas_pedidos_proveedores: require("./linea_pedido_proveedor.model")(sequelize, Sequelize),
    pedidos_proveedores: require("./pedido_proveedor.model")(sequelize, Sequelize),
    pedidos: require("./pedido.model")(sequelize, Sequelize),
    respuestas: require("./respuesta.model")(sequelize, Sequelize),
    ROLES:   ["user", "admin", "moderator"]
};

db.consultas.hasOne(db.respuestas, { foreignKey: 'id_consulta' });
db.respuestas.belongsTo(db.consultas, { foreignKey: 'id_consulta' });

db.clientes.hasMany(db.consultas, { foreignKey: 'id_cliente' });
db.consultas.belongsTo(db.clientes, { foreignKey: 'id_cliente' });

db.clientes.hasMany(db.devoluciones, { foreignKey: 'id_cliente' });
db.devoluciones.belongsTo(db.clientes, { foreignKey: 'id_cliente' });

db.devoluciones.hasMany(db.lineas_devoluciones, { foreignKey: 'id_devolucion' });
db.lineas_devoluciones.belongsTo(db.devoluciones, { foreignKey: 'id_devolucion' });

db.libros.hasMany(db.lineas_devoluciones, { foreignKey: 'id_libro' })
db.lineas_devoluciones.belongsTo(db.libros, { foreignKey: 'id_libro' });

db.clientes.hasMany(db.pedidos, { foreignKey: 'id_cliente' });
db.pedidos.belongsTo(db.clientes, { foreignKey: 'id_cliente' });

db.encargados.hasMany(db.pedidos, { foreignKey: 'id_encargado' });
db.pedidos.belongsTo(db.encargados, { foreignKey: 'id_encargado' });

db.pedidos.hasMany(db.lineas_pedidos, { foreignKey: 'id_pedido' });
db.lineas_pedidos.belongsTo(db.pedidos, { foreignKey: 'id_pedido' });

db.libros.hasMany(db.lineas_pedidos, { foreignKey: 'id_libro' });
db.lineas_pedidos.belongsTo(db.libros, { foreignKey: 'id_libro' });

db.encargados.hasMany(db.pedidos_proveedores, { foreignKey: 'id_encargado' });
db.pedidos_proveedores.belongsTo(db.encargados, { foreignKey: 'id_encargado' });

db.pedidos_proveedores.hasOne(db.albaranes, { foreignKey: 'id_pedido_proveedor' });
db.albaranes.belongsTo(db.pedidos_proveedores, { foreignKey: 'id_pedido_proveedor' });

db.pedidos_proveedores.hasMany(db.lineas_pedidos_proveedores, { foreignKey: 'id_pedido_proveedor' });
db.lineas_pedidos_proveedores.belongsTo(db.pedidos_proveedores, { foreignKey: 'id_pedido_proveedor' });

db.lineas_pedidos_proveedores.belongsTo(db.libros, { foreignKey: 'id_libro' });
db.libros.hasMany(db.lineas_pedidos_proveedores, { foreignKey: 'id_libro' });

db.pedidos.hasOne(db.facturas, { foreignKey: 'id_pedido' });
db.facturas.belongsTo(db.pedidos, { foreignKey: 'id_pedido' });

module.exports = db;
