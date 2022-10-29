'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      admin.belongsTo(models.UserType, {
				foreignKey: 'userTypeId',
			})
    }
  }
  admin.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    userTypeId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'admin',
  });
  return admin;
};