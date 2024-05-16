/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} dataTypes
 *
 */

//Modelo de Categorie con sequelize

module.exports = (sequelize, dataTypes) => {
  let alias = 'Categories'
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: dataTypes.STRING(20),
      allowNull: false,
    },
  }
  let config = {
    tableName: 'categories',
    timestamps: false,
  }
  const Categorie = sequelize.define(alias, cols, config)

  Categorie.associate = function (models) {
    //Aqui se establece la relacion con la tabla products (1:M)
    Categorie.hasMany(models.Products, {
      as: 'products',
      foreignKey: 'categories_id',
    })
  }

  return Categorie
}
