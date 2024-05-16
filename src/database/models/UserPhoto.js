/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} dataTypes
 *
 */

//Modelo de UserPhoto con sequelize

module.exports = (sequelize, dataTypes) => {
  let alias = 'UserPhotos'
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
    tableName: 'users_photos',
    timestamps: false,
  }

  const UserPhoto = sequelize.define(alias, cols, config)

  //Aqui se establece la relacion con la tabla users (1:1)
  UserPhoto.associate = function (models) {
    UserPhoto.hasOne(models.Users, {
      as: 'users',
      foreignKey: 'photos_id',
    })
  }

  return UserPhoto
}
