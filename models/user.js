
'use strict';
const usertype = require('../models/usertype')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
			User.belongsTo(models.UserType, {
				foreignKey: 'userTypeId',
			});
			User.hasOne(models.UserInfo, {foreignKey: "userId"});

      User.hasMany(models.Item, {
				foreignKey: 'userId',
			});
		}
	}

  User.init({
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    passwordConfirmation: DataTypes.STRING,
    userTypeId: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};