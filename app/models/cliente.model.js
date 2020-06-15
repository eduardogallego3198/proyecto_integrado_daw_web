module.exports = (sequelize, Sequelize) => {
  const Cliente = sequelize.define("clientes", {
    id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    nombre: { type: Sequelize.STRING(100), allowNull: false },
    apellidos: { type: Sequelize.STRING(100), allowNull: false },
    direccion: { type: Sequelize.STRING(100), allowNull: false },
    dni: { type: Sequelize.STRING(9), allowNull: false },
    telefono: { type: Sequelize.STRING(20), allowNull: false },
    email: { type: Sequelize.STRING(100), allowNull: false, unique: true },
    nombre_usuario: { type: Sequelize.STRING(100)},
    password: { type: Sequelize.STRING(200)},
    rol: { type: Sequelize.STRING(100)},
    token: { type: Sequelize.STRING(200)},
  }, { timestamps: false });

  return Cliente;
};