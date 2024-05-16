/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} dataTypes
 *
 */

module.exports = (sequelize, dataTypes) => {
  let alias = 'Brands'
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING,
    },
  }
  let config = {
    tableName: 'brands',
    timestamps: false,
  }
  const Brand = sequelize.define(alias, cols, config)

  Brand.associate = function (models) {
    Brand.hasMany(models.Products, {
      as: 'products',
      foreignKey: 'brands_id',
    })
  }

  return Brand
}