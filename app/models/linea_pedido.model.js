module.exports = (sequelize, Sequelize) => {
    const Linea_pedido = sequelize.define("lineas_pedidos", {
      id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
      id_pedido: {type: Sequelize.INTEGER, allowNull: false},
      id_libro: {type: Sequelize.INTEGER, allowNull: false},
      cantidad: {type: Sequelize.INTEGER, allowNull: false},
      total_linea: {type: Sequelize.DECIMAL(7,2), allowNull: false}
    }, {timestamps: false});

    return Linea_pedido;
};