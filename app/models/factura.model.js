module.exports = (sequelize, Sequelize) => {
    const Factura = sequelize.define("facturas", {
      id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
      id_pedido: {type: Sequelize.INTEGER, allowNull: false},
      fecha: {type: Sequelize.DATEONLY, allowNull: false},
      metodo_pago: {type: Sequelize.STRING(20), allowNull: false}
    }, {timestamps: false});
  
    return Factura;
};