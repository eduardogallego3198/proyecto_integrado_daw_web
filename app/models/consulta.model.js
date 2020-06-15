module.exports = (sequelize, Sequelize) => {
  const Consulta = sequelize.define("consultas", {
    id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
    id_cliente: {type: Sequelize.INTEGER, allowNull: false},
    asunto: {type: Sequelize.STRING(100), allowNull: false},
    mensaje: {type: Sequelize.TEXT, allowNull: false}
  }, {timestamps: false});
  
  return Consulta;
};