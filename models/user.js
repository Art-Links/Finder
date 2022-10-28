
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
			})
			// User.hasMany(models.Photo, {
			// 	foreignKey: 'photoableId',
			// 	constraints: false,
			// 	scope: {
			// 		photoableType: 'member'
			// 	}
			// });
		}
	}
  User.init({
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    userTypeId: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    deleteAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};