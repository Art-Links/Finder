'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.User, {
				foreignKey: 'userId'
			});
      Item.belongsTo(models.Category, {
				foreignKey: 'categoryId'
			});
      Item.hasMany(models.Question, {
        foreignKey: 'itemId'
      })
      Item.hasMany(models.Form, {
        foreignKey: 'itemId'
      })
    }
  }
  Item.init({
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    blurImage: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
    lat: DataTypes.STRING,
    lng: DataTypes.STRING,
    placeId: DataTypes.TEXT,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    isReturned: DataTypes.DATE,
    allowedAttempts: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Item',
    tableName: 'items',
    paranoid: true
  });
  return Item;
};