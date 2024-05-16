/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} dataTypes
 *
 */

//Modelo de Role con sequelize

module.exports = (sequelize, dataTypes) => {
  let alias = 'Roles'
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: dataTypes.TEXT,
      allowNull: false,
    },
  }

  let config = {
    tableName: 'roles',
    timestamps: false,
  }

  const Role = sequelize.define(alias, cols, config)

  //Aqui se establece la relacion con la tabla users (1:M)
  Role.associate = function (models) {
    Role.hasMany(models.Users, {
      as: 'users',
      foreignKey: 'roles_id',
    })
  }

  return Role
}
