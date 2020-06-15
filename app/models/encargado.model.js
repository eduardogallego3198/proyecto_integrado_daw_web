module.exports = (sequelize, Sequelize) => {
  const Encargado = sequelize.define("encargados", {
    id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    nombre: { type: Sequelize.STRING(100), allowNull: false },
    apellidos: { type: Sequelize.STRING(100), allowNull: false }, 
    nombre_usuario: { type: Sequelize.STRING(100) },
    password: { type: Sequelize.STRING(200) },
    rol: { type: Sequelize.STRING(100) },
    token: { type: Sequelize.STRING(200) },
  }, { timestamps: false });

  return Encargado;
};