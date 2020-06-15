module.exports = (sequelize, Sequelize) => {
  const Pedido_proveedor = sequelize.define("pedidos_proveedores", {
    id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    fecha: { type: Sequelize.DATEONLY, allowNull: false },
    proveedor: { type: Sequelize.STRING(100), allowNull: false },
    id_encargado: { type: Sequelize.INTEGER, allowNull: false },
    pagado: { type: Sequelize.BOOLEAN, allowNull: false },
    total: { type: Sequelize.DECIMAL(7,2), allowNull: false }
  }, { timestamps: false });

  return Pedido_proveedor;
};