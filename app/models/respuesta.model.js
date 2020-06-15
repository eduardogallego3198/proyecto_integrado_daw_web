module.exports = (sequelize, Sequelize) => {
  const Respuesta = sequelize.define("respuestas", {
    id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
    id_consulta: {type: Sequelize.INTEGER, allowNull: false},
    mensaje: {type: Sequelize.TEXT, allowNull: false}
  }, {timestamps: false});
  
  return Respuesta;
};