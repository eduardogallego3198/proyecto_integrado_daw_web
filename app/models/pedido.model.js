module.exports = (sequelize, Sequelize) => {
  const Pedido = sequelize.define("pedidos", {
    id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
    fecha: {type: Sequelize.DATEONLY, allowNull: false},
    id_encargado: {type: Sequelize.INTEGER, allowNull: false},
    id_cliente: {type: Sequelize.INTEGER, allowNull: false},
    pagado: {type: Sequelize.BOOLEAN, allowNull: false},
    total: {type: Sequelize.DECIMAL(7,2), allowNull: false},
    estado: {type: Sequelize.STRING(100), allowNull: false}
  }, {timestamps: false});

  return Pedido;
};