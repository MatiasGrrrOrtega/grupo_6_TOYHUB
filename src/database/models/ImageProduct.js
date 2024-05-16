/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} dataTypes
 *
 */

module.exports = (sequelize, dataTypes) => {
  let alias = 'ImageProducts'
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING,
    }
  }
  let config = {
    tableName: 'images_products',
    timestamps: false,
  }
  const ImageProduct = sequelize.define(alias, cols, config)

  ImageProduct.associate = function (models) {
    //Aqui se establece la relacion con la tabla products (1:M)
    ImageProduct.belongsToMany(models.Products, {
      as: 'products',
      through: 'products_images',
      foreignKey: 'images_products_id',
      otherKey: 'products_id',
      timestamps: false,
    })
  }

  return ImageProduct
}