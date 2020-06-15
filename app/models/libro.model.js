module.exports = (sequelize, Sequelize) => {
  const Libro = sequelize.define("libros", {
    id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
    titulo: {type: Sequelize.STRING(100), allowNull: false},
    autor: {type: Sequelize.STRING(100), allowNull: false},
    editorial: {type: Sequelize.STRING(100), allowNull: false},
    genero: {type: Sequelize.STRING(100), allowNull: false},
    ano_publicacion: {type: Sequelize.INTEGER, allowNull: false},
    paginas: {type: Sequelize.INTEGER, allowNull: false},
    descripcion: {type: Sequelize.TEXT, allowNull: false},
    stock: {type: Sequelize.INTEGER, allowNull: false},
    precio: {type: Sequelize.DECIMAL(4,2), allowNull: false},
    url_imagen: {type: Sequelize.STRING(200)}
  }, {timestamps: false});
  
  return Libro;
};