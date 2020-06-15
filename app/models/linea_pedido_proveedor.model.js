module.exports = (sequelize, Sequelize) => {
  const Linea_pedido_proveedor = sequelize.define("lineas_pedidos_proveedores", {
    id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
    id_pedido_proveedor: {type: Sequelize.INTEGER, allowNull: false},
    id_libro: {type: Sequelize.INTEGER, allowNull: false},
    cantidad: {type: Sequelize.INTEGER, allowNull: false},
    total_linea: {type: Sequelize.DECIMAL(7,2), allowNull: false}
  }, {timestamps: false});

  return Linea_pedido_proveedor;
};