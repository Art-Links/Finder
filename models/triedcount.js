'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TriedCount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TriedCount.init({
    userId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    county: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TriedCount',
  });
  return TriedCount;
};