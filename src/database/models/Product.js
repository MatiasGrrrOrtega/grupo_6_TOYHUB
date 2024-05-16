/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} dataTypes
 *
 */
//Modelo de Product con sequelize
module.exports = (sequelize, dataTypes) => {
  let alias = 'Products'
  let cols = {
    id: {
      type: dataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: dataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: dataTypes.FLOAT,
      allowNull: false,
    },
    dues: {
      type: dataTypes.FLOAT,
      allowNull: false,
    },
    share: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    stock: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: dataTypes.TEXT,
      allowNull: false,
    },
    categories_id: {
      type: dataTypes.INTEGER,
    },
    brands_id: {
      type: dataTypes.INTEGER,
    },
  }

  let config = {
    tableName: 'products',
    timestamps: false,
  }

  const Product = sequelize.define(alias, cols, config)

  Product.associate = function (models) {
    //Aqui se establece la relacion con la tabla cart (1:M)
    // Product.belongsToMany(models.Cart, {
    //   as: 'carts',
    //   foreignKey: 'products_id',
    // })

    Product.belongsToMany(models.ImageProducts, {
      as: 'images',
      through: 'products_images',
      foreignKey: 'products_id',
      otherKey: 'images_products_id',
      timestamps: false,
    })

    //Aqui se establece la relacion con la tabla categories (M:1)
    Product.belongsTo(models.Categories, {
      as: 'category',
      foreignKey: 'categories_id',
    })

    //Aqui se establece la relacion con la tabla brands (M:1)
    Product.belongsTo(models.Brands, {
      as: 'brand',
      foreignKey: 'brands_id',
    })
  }

  return Product
}
