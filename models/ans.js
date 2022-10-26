'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ans extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ans.init({
    answer: DataTypes.STRING,
    questionId: DataTypes.INTEGER,
    correct: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Ans',
  });
  return Ans;
};