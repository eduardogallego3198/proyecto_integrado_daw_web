 module.exports = (sequelize, Sequelize) => {
    const Linea_devolucion = sequelize.define("lineas_devoluciones", {
      id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
      id_devolucion: {type: Sequelize.INTEGER, allowNull: false},
      id_libro: {type: Sequelize.INTEGER, allowNull: false},
      cantidad: {type: Sequelize.INTEGER, allowNull: false},
      total_linea: {type: Sequelize.DECIMAL(7,2), allowNull: false}
    }, {timestamps: false});

    return Linea_devolucion;
};