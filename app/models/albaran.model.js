module.exports = (sequelize, Sequelize) => {
  const Albaran = sequelize.define("albaranes", {
    id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
    id_pedido_proveedor: {type: Sequelize.INTEGER, allowNull: false},
    fecha: {type: Sequelize.DATEONLY, allowNull: false},
    metodo_pago: {type: Sequelize.STRING(20), allowNull: false}
  }, {timestamps: false});
  
  return Albaran;
};