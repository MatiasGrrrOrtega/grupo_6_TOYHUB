/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} dataTypes
 *
 */
//Modelo de Usuario con sequelize
module.exports = (sequelize, dataTypes) => {
  let alias = 'Users'
  let cols = {
    id: {
      type: dataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    telephone: {
      type: dataTypes.STRING(64),
      allowNull: true,
      defaultValue: null,
    },
    password: {
      type: dataTypes.TEXT,
      allowNull: false,
    },
    photos_id: {
      type: dataTypes.INTEGER,
    },
    roles_id: {
      type: dataTypes.INTEGER,
    },
  }

  let config = {
    tableName: 'users',
    timestamps: false,
  }

  const User = sequelize.define(alias, cols, config)

  User.associate = function (models) {
    //Aque se establece la relacion con la tabla users_photos (1:1)
    User.belongsTo(models.UserPhotos, {
      as: 'photo',
      foreignKey: 'photos_id',
    })

    //Aqui se establece la relacion con la tabla roles (1:M)
    User.belongsTo(models.Roles, {
      as: 'role',
      foreignKey: 'roles_id',
    })
  }

  return User
}
