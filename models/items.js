'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      items.belongsTo(models.User, {
				foreignKey: 'userId'
			});
    }
  }
  items.init({
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    blurImage: DataTypes.STRING,
    deleteAt: DataTypes.DATE,
    latX: DataTypes.STRING,
    lutY: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    street: DataTypes.STRING,
    discrrtion: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    isReturned: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'items',
  });
  return items;
};